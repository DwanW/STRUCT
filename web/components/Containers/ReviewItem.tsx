import React from "react";
import { Review } from "../../generated/graphql";
import Avatar from "./Avatar";
import { useVoteReviewMutation } from "../../generated/graphql";
import gql from "graphql-tag";

interface ReviewItemProps {
  review: Review | undefined;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [voteReviewMutation] = useVoteReviewMutation();

  if (!review) {
    return <div className="p-4">loading review item</div>;
  }

  return (
    <div className="p-4 flex flex-col-reverse sm:flex-row">
      <div className="w-full sm:w-36 flex flex-row sm:flex-col justify-between sm:justify-start">
        <div>
          <Avatar avatarUrl={review.user.avatar_url} />
          {review.user.username}
        </div>

        <div>
          <div>Posted on </div>
          <div>
            {new Date(parseInt(review.createdAt)).toLocaleDateString("en", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="border-b border-gray-400 text-base">{review.text}</div>
        <div className="text-sm my-2 text-gray-700">
          <div>{review.helpful_score} people found this review helpful</div>
          <div>{review.funny_score} people found this review interesting</div>
          <div>Was this review helpful?</div>
          <div className="flex flex-row text-xs">
            <button
              className={`px-1 mx-1 capitalize border-gray-300 flex items-center border ${
                review.reviewVoteStatus === 1 ? "bg-gray-500" : ""
              }`}
              onClick={() =>
                voteReviewMutation({
                  variables: {
                    reviewId: review.id,
                    value: 1,
                  },
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>{" "}
              <span className="hidden sm:inline ml-1"> helpful</span>
            </button>
            <button
              className={`px-1 mx-1 capitalize border-gray-300 flex items-center border ${
                review.reviewVoteStatus === -1 ? "bg-gray-500" : ""
              }`}
              onClick={() =>
                voteReviewMutation({
                  variables: {
                    reviewId: review.id,
                    value: -1,
                  },
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
              <span className="hidden sm:inline ml-1"> unhelpful</span>
            </button>
            <button
              className={`px-1 mx-1 capitalize border-gray-300 flex items-center border ${
                review.reviewVoteStatus === 0 ? "bg-gray-500" : ""
              }`}
              onClick={() =>
                voteReviewMutation({
                  variables: {
                    reviewId: review.id,
                    value: 0,
                  },
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden sm:inline ml-1"> interesting</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
