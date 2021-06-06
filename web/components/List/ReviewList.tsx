import React, { useEffect } from "react";
import {
  HelpfulReviewCursor,
  Review,
  useCanUserCreateReviewQuery,
  useGetHelpfulStoryReviewsQuery,
} from "../../generated/graphql";
import ReviewItem from "../Containers/ReviewItem";
import CreateReview from "../Forms/CreateReview";
import { NetworkStatus } from "@apollo/client";

interface ReviewListProps {
  storyId: number;
  storyCreatorId?: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ storyId, storyCreatorId }) => {
  const { data, loading, fetchMore, refetch, networkStatus } =
    useGetHelpfulStoryReviewsQuery({
      variables: {
        limit: 10,
        cursor: null,
        //   time_range:30,
        storyId: storyId,
      },
      // fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    });
  // console.log(networkStatus, NetworkStatus.refetch);
  // useEffect(() => {
  //   refetch();
  // }, [storyId]);

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

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <div>loading reviews...</div>;
  }

  if (data && data.getHelpfulStoryReviews.reviews.length === 0) {
    return (
      <div>
        This story doesn't have any review yet.{" "}
        <div>{renderCreateReviewSection()}</div>
      </div>
    );
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
