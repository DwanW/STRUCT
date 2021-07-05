import React from "react";
import defineRating from "../../utils/defineRating";

interface CardProps {
  title: string;
  coverUrl: string | undefined | null;
  author: string;
  upvote: number;
  downvote: number;
}

const Card: React.FC<CardProps> = ({
  title,
  coverUrl,
  author,
  downvote,
  upvote,
}) => {
  return (
    <>
      <div className="w-full h-56 shadow-md bg-white dark:bg-gray-800 transition-colors ease duration-300">
        <img
          className="w-full h-full z-0 object-cover"
          src={coverUrl ? coverUrl : "/img/story-default.svg"}
        />
      </div>
      <div className="w-full p-2">
        <div className="font-semibold capitalize">{title}</div>
        <div className="text-sm pt-2 text-gray-600 dark:text-gray-300">
          {author}
        </div>
        <div className="text-sm pt-2">
          Rating: {defineRating(upvote, downvote)}
        </div>
      </div>
    </>
  );
};

export default Card;
