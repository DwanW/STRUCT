import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { Review } from "../entities/Review";
import { Story } from "../entities/Story";

declare type ReviewType = "positive" | "negative" | "neutral";

// @ObjectType()
// class PaginatedStory {
//   @Field(() => [Story])
//   stories: Story[];
//   @Field()
//   next_cursor: string;
// }

@ObjectType()
class ReviewResponse {
  @Field(() => Review, { nullable: true })
  review?: Review;

  @Field(() => String, { nullable: true })
  error?: string;
}

// @InputType()
// class TopStoryCursor {
//   @Field(() => Int)
//   storyId: number;

//   @Field(() => Int)
//   net_up_votes: number;
// }

@Resolver(Review)
export class ReviewResolver {
  //   @FieldResolver(() => User)
  //   creator(@Root() story: Story, @Ctx() { creatorLoader }: MyContext) {
  //     return creatorLoader.load(story.creatorId);
  //   }

  @Mutation(() => ReviewResponse)
  @UseMiddleware(isAuth)
  async createReview(
    @Arg("storyId", () => Int) storyId: number,
    @Arg("text") text: string,
    @Arg("type") type: ReviewType,
    @Ctx() { req }: MyContext
  ): Promise<ReviewResponse> {
    const story = await Story.findOne(storyId);
    // cant create review for your own story
    if (story?.creatorId === req.session.userId) {
      return {
        error: "Cannot create review for your own story",
      };
    }

    const review = await Review.findOne({
      storyId,
      userId: req.session.userId,
    });

    if (review) {
      return {
        error: "already reviewed this story",
      };
    }

    const result = await Review.create({
      text,
      type,
      userId: req.session.userId,
      storyId,
    }).save();

    return {
      review: result,
    };
  }

  //   @Query(() => Story, { nullable: true })
  //   async getStoryById(
  //     @Arg("id", () => Int) id: number
  //   ): Promise<Story | undefined> {
  //     return Story.findOne(id);
  //   }

  //   // query sort from new to old
  //   @Query(() => PaginatedStory)
  //   async getNewStories(
  //     @Arg("limit", () => Int) limit: number,
  //     @Arg("cursor", () => String, { nullable: true }) cursor: string
  //   ): Promise<PaginatedStory> {
  //     const fetchLimit = Math.min(20, limit);
  //     const fetchAmount = fetchLimit + 1;
  //     const sqlVariables: any[] = [fetchAmount];
  //     if (cursor) {
  //       sqlVariables.push(parseInt(cursor));
  //     }

  //     const result = await getConnection().query(
  //       `
  //       select * from story
  //       ${cursor ? "where story.id <= $2" : ""}
  //       order by story.id DESC
  //       limit $1
  //       `,
  //       sqlVariables
  //     );

  //     return {
  //       stories: result.slice(0, fetchLimit),
  //       next_cursor:
  //         result.length === fetchAmount ? result[result.length - 1].id : "",
  //     };
  //   }

  //   @Query(() => PaginatedStory)
  //   async getTopStories(
  //     @Arg("limit", () => Int) limit: number,
  //     @Arg("cursor", { nullable: true }) cursor: TopStoryCursor,
  //     @Arg("time_range", () => String, { defaultValue: "1" }) time_range: string
  //   ) {
  //     const fetchLimit = Math.min(20, limit);
  //     const fetchAmount = fetchLimit + 1;
  //     const sqlVariables: any[] = [fetchAmount];
  //     const time_limit = new Date(Date.now() - parseInt(time_range) * 86400000);

  //     if (cursor !== null) {
  //       sqlVariables.push(cursor.net_up_votes);
  //       sqlVariables.push(cursor.storyId);
  //       sqlVariables.push(time_limit);
  //     }

  //     const result = await getConnection().query(
  //       `
  //       select * from story
  //       where ((story.up_vote - story.down_vote) = $2 and story.id <= $3 ) or ((story.up_vote - story.down_vote) < $2) and (story."createdAt" > $4)
  //       order by (story.up_vote - story.down_vote) DESC, story.id DESC,
  //       limit $1
  //       `,
  //       sqlVariables
  //     );

  //     return {
  //       stories: result.slice(0, fetchLimit),
  //       next_cursor:
  //         result.length === fetchAmount ? result[result.length - 1].id : "",
  //     };
  //   }

  //   @Mutation(() => Story)
  //   @UseMiddleware(isAuth)
  //   async updateStory(
  //     @Arg("id", () => Int) id: number,
  //     @Arg("title") title: string,
  //     @Arg("overview") overview: string,
  //     @Ctx() { req }: MyContext
  //   ): Promise<Story | null> {
  //     const result = await getConnection()
  //       .createQueryBuilder()
  //       .update(Story)
  //       .set({ title, overview })
  //       .where('id = :id and "creatorId" = :creatorId', {
  //         id,
  //         creatorId: req.session.userId,
  //       })
  //       .returning("*")
  //       .execute();

  //     return result.raw[0];
  //   }

  //   @Mutation(() => Story)
  //   @UseMiddleware(isAuth)
  //   async publishStory(
  //     @Arg("id", () => Int) id: number,
  //     @Ctx() { req }: MyContext
  //   ): Promise<Story | null> {
  //     const result = await getConnection()
  //       .createQueryBuilder()
  //       .update(Story)
  //       .set({ status: "published" })
  //       .where('id = :id and "creatorId" = :creatorId', {
  //         id,
  //         creatorId: req.session.userId,
  //       })
  //       .returning("*")
  //       .execute();

  //     return result.raw[0];
  //   }

  //   @Mutation(() => Boolean)
  //   @UseMiddleware(isAuth)
  //   async vote(
  //     @Arg("storyId", () => Int) storyId: number,
  //     @Arg("value", () => Int) value: number,
  //     @Ctx() { req }: MyContext
  //   ) {
  //     const { userId } = req.session;
  //     const voteValue = value > 0 ? 1 : value < 0 ? -1 : 0;
  //     const upvote = value > 0 ? 1 : 0;
  //     const downvote = value < 0 ? 1 : 0;

  //     const currentVote = await Vote.findOne({ where: { storyId, userId } }); // (+1 , -1 or 0) or undefined

  //     if (
  //       currentVote !== undefined &&
  //       currentVote.value !== voteValue &&
  //       voteValue !== 0
  //     ) {
  //       //changing vote
  //       await getConnection().transaction(async (transManager) => {
  //         await transManager.query(`
  //         update vote
  //         set value = ${voteValue}
  //         where "storyId" = ${storyId} and "userId" = ${userId}
  //         `);

  //         await transManager.query(`
  //         update story
  //         set up_vote = up_vote + ${
  //           currentVote.value === 0 ? upvote : voteValue
  //         }, down_vote = down_vote + ${
  //           currentVote.value === 0 ? downvote : -voteValue
  //         }
  //         where id = ${storyId}
  //         `);
  //       });
  //     } else if (
  //       currentVote !== undefined &&
  //       currentVote.value !== voteValue &&
  //       voteValue === 0
  //     ) {
  //       //unvote
  //       await getConnection().transaction(async (transManager) => {
  //         await transManager.query(`
  //         update vote
  //         set value = ${voteValue}
  //         where "storyId" = ${storyId} and "userId" = ${userId}
  //         `);

  //         await transManager.query(`
  //         update story
  //         set up_vote = up_vote + ${
  //           currentVote.value > 0 ? -1 : 0
  //         }, down_vote = down_vote + ${currentVote.value < 0 ? -1 : 0}
  //         where id = ${storyId}
  //         `);
  //       });
  //     } else if (currentVote === undefined && voteValue !== 0) {
  //       //has never voted, creating new vote
  //       await getConnection().transaction(async (transManager) => {
  //         await transManager.query(`
  //         insert into vote ("userId", "storyId", "value")
  //         values (${userId}, ${storyId}, ${voteValue})
  //         `);
  //         await transManager.query(`
  //         update story
  //         set up_vote = up_vote + ${upvote}, down_vote = down_vote + ${downvote}
  //         where id = ${storyId}
  //         `);
  //       });
  //     }
  //     return true;
  //   }

  //   @Mutation(() => S3SignResponse)
  //   @UseMiddleware(isAuth)
  //   async signS3StoryCover(
  //     @Arg("filename", () => String) filename: string,
  //     @Arg("filetype", () => String) filetype: string
  //   ) {
  //     const s3Params = {
  //       Bucket: S3BUCKET_NAME,
  //       Key: `cover/${filename}`,
  //       ContentType: filetype,
  //       ACL: "public-read",
  //     };

  //     const signedS3url = await getSignedUrl(s3, new PutObjectCommand(s3Params), {
  //       expiresIn: S3SIGN_EXPIRE_TIME,
  //     });

  //     const object_url = `https//${S3BUCKET_NAME}.s3.amazonaws.com/cover/${filename}`;

  //     return {
  //       error: null,
  //       signedS3url: signedS3url,
  //       obj_url: object_url,
  //     };
  //   }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteReview(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const review = await Review.findOne(id);
    if (!review) {
      return false;
    }
    if (review.userId !== req.session.userId) {
      return false;
    }
    await Review.delete({ id });
    return true;
  }

  //   @Mutation(() => Story, { nullable: true })
  //   @UseMiddleware(isAuth)
  //   async updateStoryCover(
  //     @Arg("cover_url", () => String) cover_url: string,
  //     @Arg("id", () => Int) id: number,
  //     @Ctx() { req }: MyContext
  //   ): Promise<Story | null> {
  //     const story = await Story.findOne(id);
  //     if (!story) {
  //       return null;
  //     }

  //     if (story.creatorId !== req.session.userId) {
  //       return null;
  //     }
  //     story.cover_url = cover_url;
  //     const result = await story.save();
  //     return result;
  //   }
}
