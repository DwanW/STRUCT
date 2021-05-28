import React from "react";

interface CardProps {
  title: string;
  coverUrl: string | undefined | null;
}

const Card: React.FC<CardProps> = ({ title, coverUrl }) => {
  return (
    <>
      <div className="w-full h-56 border-gray-200 border shadow-md">
        <img
          className="w-full h-full z-0 object-cover"
          src={coverUrl ? coverUrl : "/img/story-default.svg"}
        />
      </div>
      <div className="w-full p-2">
        <div className="font-semibold capitalize">{title}</div>
        <div className="text-sm pt-2 text-gray-600">Author Name</div>
        <div className="text-sm pt-2">Review Score</div>
      </div>
    </>
  );
};

export default Card;
