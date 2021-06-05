import React from "react";
import {
  HelpfulReviewCursor,
  Review,
  useCanUserCreateReviewQuery,
  useGetHelpfulStoryReviewsQuery,
} from "../../generated/graphql";
import ReviewItem from "../Containers/ReviewItem";
import CreateReview from "../Forms/CreateReview";

interface ReviewListProps {
  storyId: number;
  storyCreatorId?: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ storyId, storyCreatorId }) => {
  const { data, loading, error, fetchMore } = useGetHelpfulStoryReviewsQuery({
    variables: {
      limit: 10,
      cursor: null,
      //   time_range:30,
      storyId: storyId,
    },
  });

  const { data: accessData } = useCanUserCreateReviewQuery({
    fetchPolicy: "no-cache",
    variables: {
      storyId: storyId,
      storyCreatorId: storyCreatorId as number,
    },
  });

  const renderCreateReviewSection = () => {
    if (!accessData?.canUserCreateReview) {
      return null;
    }

    return <CreateReview storyId={storyId} />;
  };

  if (!data) {
    return <div>loading reviews...</div>;
  }

  if (data.getHelpfulStoryReviews.reviews.length === 0) {
    return <div>This story doesn't have any review yet.</div>;
  }

  //paginated review if needed
  const fetchMoreHelpfulReview = () => {
    if (data?.getHelpfulStoryReviews.next_cursor) {
      let newCursor: HelpfulReviewCursor = {
        id: data.getHelpfulStoryReviews.next_cursor.id,
        helpful_score: data.getHelpfulStoryReviews.next_cursor.helpful_score,
      };
      fetchMore({
        variables: {
          limit: 10,
          cursor: newCursor,
        },
      });
    }
  };

  return (
    <>
      <div>{renderCreateReviewSection()}</div>
      <div className="flex-col w-full">
        {data.getHelpfulStoryReviews.reviews.map((review, idx) => (
          <ReviewItem key={idx} review={review as Review} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
