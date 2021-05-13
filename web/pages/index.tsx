// import Head from "next/head";
// import Image from "next/image";

import { useState } from "react";
import StoryNavbar from "../components/Navbars/StoryNavbar";
import { useStoriesNewQuery } from "../generated/graphql";

export default function Home() {
  const [storyNewCursor, setStoryNewCursor] = useState(null);

  const { data, loading, error } = useStoriesNewQuery({
    variables: {
      limit: 10,
      cursor: storyNewCursor,
    },
  });

  // console.log({data});
  return (
    <>
      <StoryNavbar />
      <div>hello next js</div>
      <div>
        {data?.getNewStories.stories.map((story, idx) => (
          <div key={idx}>
            <div>{story.title}</div>
            <div>{story.overview}</div>
          </div>
        ))}
      </div>
    </>
  );
}
