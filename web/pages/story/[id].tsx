import { NextPage } from "next";
import React from "react";
import { useGetStoryFromUrl } from "../../utils/hooks";

interface StoryProps {}

const StoryPage: NextPage<StoryProps> = ({}) => {
  const { data } = useGetStoryFromUrl();

  return <div>{data?.getStoryById?.id}</div>;
};

export default StoryPage;
