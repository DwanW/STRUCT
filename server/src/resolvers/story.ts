import { Story } from "../entities/Story";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
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

  @Query(() => [Story])
  getStories() {}

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
