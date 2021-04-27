import { Story } from "../entities/Story";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { CreateStoryInput } from "../utils/CreateStoryInput";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { S3SignResponse } from "../utils/sharedTypes";
import { S3BUCKET_NAME, S3SIGN_EXPIRE_TIME } from "../constants";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3";

@ObjectType()
class PaginatedStory {
  @Field(() => [Story])
  stories: Story[];
  @Field()
  next_cursor: string;
}

@InputType()
class TopStoryCursor {
  @Field(() => Int)
  storyId: number;

  @Field(() => Int)
  net_up_votes: number;
}

@Resolver(Story)
export class StoryResolver {
  @FieldResolver(() => User)
  creator(@Root() story: Story, @Ctx() { creatorLoader }: MyContext) {
    return creatorLoader.load(story.creatorId);
  }

  @Mutation(() => Story)
  @UseMiddleware(isAuth)
  async createStory(
    @Arg("storyInput", () => CreateStoryInput) input: CreateStoryInput,
    @Ctx() { req }: MyContext
  ): Promise<Story> {
    return Story.create({ ...input, creatorId: req.session.userId }).save();
  }

  @Query(() => Story, { nullable: true })
  async getStoryById(
    @Arg("id", () => Int) id: number
  ): Promise<Story | undefined> {
    return Story.findOne(id);
  }

  // query sort from new to old
  @Query(() => PaginatedStory)
  async getNewStories(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string
  ): Promise<PaginatedStory> {
    const fetchLimit = Math.min(20, limit);
    const fetchAmount = fetchLimit + 1;
    const sqlVariables: any[] = [fetchAmount];
    if (cursor) {
      sqlVariables.push(parseInt(cursor));
    }

    const result = await getConnection().query(
      `
      select * from story
      ${cursor ? "where story.id <= $2" : ""}
      order by story.id DESC
      limit $1
      `,
      sqlVariables
    );

    return {
      stories: result.slice(0, fetchLimit),
      next_cursor:
        result.length === fetchAmount ? result[result.length - 1].id : "",
    };
  }

  @Query(() => PaginatedStory)
  async getTopStories(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor: TopStoryCursor,
    @Arg("time_range", () => String, { defaultValue: "1" }) time_range: string
  ) {
    const fetchLimit = Math.min(20, limit);
    const fetchAmount = fetchLimit + 1;
    const sqlVariables: any[] = [fetchAmount];
    const time_limit = new Date(Date.now() - parseInt(time_range) * 86400000);

    if (cursor !== null) {
      sqlVariables.push(cursor.net_up_votes);
      sqlVariables.push(cursor.storyId);
      sqlVariables.push(time_limit);
    }

    const result = await getConnection().query(
      `
      select * from story
      where ((story.up_vote - story.down_vote) = $2 and story.id <= $3 ) or ((story.up_vote - story.down_vote) < $2) and (story."createdAt" > $4)
      order by (story.up_vote - story.down_vote) DESC, story.id DESC,
      limit $1
      `,
      sqlVariables
    );

    return {
      stories: result.slice(0, fetchLimit),
      next_cursor:
        result.length === fetchAmount ? result[result.length - 1].id : "",
    };
  }

  @Mutation(() => Story)
  @UseMiddleware(isAuth)
  async updateStory(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("overview") overview: string,
    @Ctx() { req }: MyContext
  ): Promise<Story | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Story)
      .set({ title, overview })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Story)
  @UseMiddleware(isAuth)
  async publishStory(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Story | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Story)
      .set({ status: "published" })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => S3SignResponse)
  @UseMiddleware(isAuth)
  async signS3StoryCover(
    @Arg("filename", () => String) filename: string,
    @Arg("filetype", () => String) filetype: string
  ) {
    const s3Params = {
      Bucket: S3BUCKET_NAME,
      Key: `cover/${filename}`,
      ContentType: filetype,
      ACL: "public-read",
    };

    const signedS3url = await getSignedUrl(s3, new PutObjectCommand(s3Params), {
      expiresIn: S3SIGN_EXPIRE_TIME,
    });

    const object_url = `https//${S3BUCKET_NAME}.s3.amazonaws.com/cover/${filename}`;

    return {
      error: null,
      signedS3url: signedS3url,
      obj_url: object_url,
    };
  }

  @Mutation(() => Boolean)
  async deleteStoryById(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const story = await Story.findOne(id);
    if (!story) {
      return false;
    }
    if (story.creatorId !== req.session.userId) {
      return false;
    }
    await Story.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
