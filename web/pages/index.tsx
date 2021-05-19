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
      <div className="mt-16 container mx-auto px-8 pb-2 font-medium text-2xl border-b-2 border-gray-100">New Stories</div>
      <div className="container mx-auto px-4 min-h-full flex flex-col sm:flex-row flex-wrap">
        {data?.getNewStories.stories.map((story, idx) => (
          <div className="my-4 mx-4">
            <Card key={idx} title={story.title} coverUrl={story.cover_url} />
          </div>
        ))}
      </div>
      {/* <StoryCoverUpload storyId={3} /> */}
    </>
  );
}
