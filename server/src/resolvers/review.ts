import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { Review } from "../entities/Review";
import { Story } from "../entities/Story";
import { getConnection } from "typeorm";
import { ReviewVote } from "../entities/ReviewVote";

declare type ReviewType = "positive" | "negative" | "neutral";

@ObjectType()
class PaginatedReview {
  @Field(() => [Review])
  reviews: Review[];
  @Field(() => Review)
  next_cursor: Review;
}

@ObjectType()
class ReviewResponse {
  @Field(() => Review, { nullable: true })
  review?: Review;

  @Field(() => String, { nullable: true })
  error?: string;
}

@InputType()
class HelpfulReviewCursor {
  @Field(() => Int)
  id: number; // review id

  @Field(() => Int)
  helpful_score: number;
}

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

  @Query(() => Review, { nullable: true })
  async getReviewById(
    @Arg("id", () => Int) id: number
  ): Promise<Review | undefined> {
    return Review.findOne(id);
  }

  @Query(() => PaginatedReview)
  async getHelpfulStoryReviews(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor: HelpfulReviewCursor,
    @Arg("time_range", () => String, { defaultValue: "1" }) time_range: string,
    @Arg("storyId", () => Int) storyId: number
  ): Promise<PaginatedReview> {
    const fetchLimit = Math.min(20, limit);
    const fetchAmount = fetchLimit + 1;
    const sqlVariables: any[] = [fetchAmount, storyId];
    const time_limit = new Date(Date.now() - parseInt(time_range) * 86400000);
    if (cursor !== null) {
      sqlVariables.push(cursor.helpful_score); //$3
      sqlVariables.push(cursor.id); //$4
      sqlVariables.push(time_limit); //$5
    }

    const result = await getConnection().query(
      `
        select * from review
        where ${
          cursor
            ? `(review.helpful_score = $3 and review.id <= $4 ) or (review.helpful_score < $2) and`
            : ""
        } review."storyId" = $2 and (review."createdAt" > $5)
        order by review.helpful_score DESC, review.id DESC
        limit $1
        `,
      sqlVariables
    );

    return {
      reviews: result.slice(0, fetchLimit),
      next_cursor:
        result.length === fetchAmount ? result[result.length - 1] : null,
    };
  }

  @Query(() => PaginatedReview)
  async getRecentUserReviews(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor: number, //review id
    @Arg("time_range", () => String, { defaultValue: "1" }) time_range: string,
    @Arg("userId", () => Int) userId: number
  ) {
    const fetchLimit = Math.min(20, limit);
    const fetchAmount = fetchLimit + 1;
    const sqlVariables: any[] = [fetchAmount, userId];
    const time_limit = new Date(Date.now() - parseInt(time_range) * 86400000);
    if (cursor !== null) {
      sqlVariables.push(cursor); //$3
      sqlVariables.push(time_limit); //$4
    }

    const result = await getConnection().query(
      `
        select * from review
        where ${
          cursor
            ? `review.id <= $3 and`
            : ""
        } review."userId" = $2 and (review."createdAt" > $4)
        order by review.id DESC
        limit $1
        `,
      sqlVariables
    );

    return {
      reviews: result.slice(0, fetchLimit),
      next_cursor:
        result.length === fetchAmount ? result[result.length - 1] : null,
    };
  }

  // order by helpful_score first then created date
  @Mutation(() => Review)
  @UseMiddleware(isAuth)
  async updateReview(
    @Arg("id", () => Int) id: number,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<Review | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Review)
      .set({ text })
      .where('id = :id and "userId" = :userId', {
        id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async voteReview(
    @Arg("reviewId", () => Int) reviewId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const voteValue = value > 0 ? 1 : value < 0 ? -1 : 0;
    const upvote = value > 0 ? 1 : 0;
    const downvote = value < 0 ? 1 : 0;

    const currentVote = await ReviewVote.findOne({
      where: { reviewId, userId },
    }); // (+1 , -1 or 0) or undefined

    if (
      currentVote !== undefined &&
      currentVote.value !== voteValue &&
      voteValue !== 0
    ) {
      //changing vote to helpful or unhelpful
      await getConnection().transaction(async (transManager) => {
        await transManager.query(`
          update review_vote
          set value = ${voteValue}
          where "reviewId" = ${reviewId} and "userId" = ${userId}
          `);

        await transManager.query(`
          update review
          set helpful_score = helpful_score + ${
            currentVote.value === 0 ? upvote : voteValue
          }, unhelpful_score = unhelpful_score + ${
          currentVote.value === 0 ? downvote : -voteValue
        }, funny_score = funny_score + ${currentVote.value === 0 ? -1 : 0}
          where id = ${reviewId}
          `);
      });
    } else if (
      currentVote !== undefined &&
      currentVote.value !== voteValue &&
      voteValue === 0
    ) {
      //changing vote to funny
      await getConnection().transaction(async (transManager) => {
        await transManager.query(`
          update review_vote
          set value = ${voteValue}
          where "reviewId" = ${reviewId} and "userId" = ${userId}
          `);

        await transManager.query(`
          update review
          set helpful_score = helpful_score + ${
            currentVote.value > 0 ? -1 : 0
          }, unhelpful_score = unhelpful_score + ${
          currentVote.value < 0 ? -1 : 0
        }, funny_score = funny_score + 1
          where id = ${reviewId}
          `);
      });
    } else if (currentVote === undefined) {
      //has never voted, creating new vote
      await getConnection().transaction(async (transManager) => {
        await transManager.query(`
          insert into review_vote ("userId", "reviewId", "value")
          values (${userId}, ${reviewId}, ${voteValue})
          `);
        await transManager.query(`
          update review
          set helpful_score = helpful_score + ${upvote}, unhelpful_score = unhelpful_score + ${downvote}, funny_score = funny_score + ${
          voteValue === 0 ? 1 : 0
        }
          where id = ${reviewId}
          `);
      });
    }
    return true;
  }

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
}
