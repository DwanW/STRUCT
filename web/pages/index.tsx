// import Head from "next/head";
// import Image from "next/image";

import { useState } from "react";
import Card from "../components/Containers/Card";
import StoryNavbar from "../components/Navbars/StoryNavbar";
import StoryCoverUpload from "../components/Uploads/StoryCoverUpload";
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
      <div className="container mt-16 mx-auto px-4 min-h-full">
        {data?.getNewStories.stories.map((story, idx) => (
          <Card key={idx} title={story.title} coverUrl={story.cover_url} />
        ))}
      </div>
      <StoryCoverUpload storyId={3} />
    </>
  );
}
