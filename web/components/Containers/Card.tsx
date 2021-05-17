import React from "react";

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="relative w-48 h-96">
      <div className="shadow-xl h-60 w-full">image here</div>
      <div className="font-semibold capitalize pt-2">{title}</div>
      <div className="text-sm pt-2 text-gray-600">Author Name</div>
      <div className="text-sm pt-2">Review Score</div>
    </div>
  );
};

export default Card;
