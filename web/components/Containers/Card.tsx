import React from "react";

interface CardProps {
  title: string;
  coverUrl: string | undefined | null;
}

const Card: React.FC<CardProps> = ({ title, coverUrl }) => {
  console.log(coverUrl)
  return (
    <div className="relative w-48 h-96">
      <div className="shadow-xl h-60 w-full">
        <img
          className="absolute top-0 w-full h-full z-0 object-cover"
          src={coverUrl ? coverUrl : "/img/user-default.svg"}
        />
      </div>
      <div className="font-semibold capitalize pt-2">{title}</div>
      <div className="text-sm pt-2 text-gray-600">Author Name</div>
      <div className="text-sm pt-2">Review Score</div>
    </div>
  );
};

export default Card;
