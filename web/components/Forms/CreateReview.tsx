import React, { useState } from "react";
import {
  GetHelpfulStoryReviewsDocument,
  useCreateReviewMutation,
} from "../../generated/graphql";

interface CreateReviewProps {
  storyId: number;
  setDisplay: Function;
}

declare type ReviewType = "positive" | "negative" | "neutral";

const CreateReview: React.FC<CreateReviewProps> = ({ storyId, setDisplay }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewType, setReviewType] = useState<ReviewType>("positive");

  const [createReviewMutation] = useCreateReviewMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createReviewMutation({
        variables: {
          type: reviewType,
          storyId: storyId,
          text: reviewText,
        },
        refetchQueries: [
          {
            query: GetHelpfulStoryReviewsDocument,
            variables: {
              limit: 10,
              cursor: null,
              storyId: storyId,
            },
          },
        ],
      });
      setDisplay(false);
    } catch (e) {
      console.log("create review error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex flex-col">
        <h4 className="text-left text-sm leading-relaxed text-gray-600">
          Create a Review
        </h4>
        <textarea
          className="h-40 p-4 focus:outline-none border border-gray-200 focus:border-gray-400"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div>
          <div className="flex items-center mr-4 mb-4">
            <input
              id="radio1"
              type="radio"
              name="radio"
              className="form-radio"
              value="positive"
              checked={reviewType === "positive"}
              onChange={() => setReviewType("positive")}
            />
            <label htmlFor="radio1">Positive</label>
          </div>

          <div className="flex items-center mr-4 mb-4">
            <input
              id="radio2"
              type="radio"
              name="radio"
              className="form-radio"
              value="neutral"
              checked={reviewType === "neutral"}
              onChange={() => setReviewType("neutral")}
            />
            <label htmlFor="radio2">Neutral</label>
          </div>

          <div className="flex items-center mr-4 mb-4">
            <input
              id="radio3"
              type="radio"
              name="radio"
              className="form-radio"
              value="negative"
              checked={reviewType === "negative"}
              onChange={() => setReviewType("negative")}
            />
            <label htmlFor="radio3">Negative</label>
          </div>
        </div>
        <div className="flex">
          <input
            className="bg-green-500 flex text-white flex-initial w-min font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer hover:bg-green-700"
            type="submit"
            value="Submit"
          />
          <input
            className="text-gray-700 bg-gray-300 flex-initial w-min font-bold uppercase text-base px-4 py-1 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer hover:bg-gray-400"
            type="button"
            onClick={() => {
              setReviewText("");
            }}
            value="Discard"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateReview;
