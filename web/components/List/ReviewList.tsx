import React from "react";
import {
  HelpfulReviewCursor,
  Review,
  useGetHelpfulStoryReviewsQuery,
} from "../../generated/graphql";
import ReviewItem from "../Containers/ReviewItem";

interface ReviewListProps {
  storyId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ storyId }) => {
  const { data, loading, error, fetchMore } = useGetHelpfulStoryReviewsQuery({
    variables: {
      limit: 10,
      cursor: null,
      //   time_range:30,
      storyId: storyId,
    },
  });

  if (!data) {
    return <div>loading reviews...</div>;
  }

  if (data.getHelpfulStoryReviews.reviews.length === 0) {
    return <div>This story doesn't have any review yet.</div>;
  }

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
      <div className="flex-col w-full">
        {data.getHelpfulStoryReviews.reviews.map((review, idx) => (
          <ReviewItem key={idx} review={review as Review} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
