import { Story } from "src/entities/Story";
import { Mutation, Query, Resolver } from "type-graphql";

@Resolver(Story)
export class StoryResolver {
  @Mutation(() => Story)
  createStory() {}

  @Query(() => Story)
  getStoryById() {}

  @Query(() => [Story])
  getStories() {}

  @Mutation(() => Story)
  updateStory() {}

  @Mutation(() => Boolean)
  deleteStoryById() {}
}
