import { useState } from "react";
import StoryCarousel from "../components/Carousel/StoryCarousel";
import Card from "../components/Containers/Card";
import StoryNavbar from "../components/Navbars/StoryNavbar";
// import StoryCoverUpload from "../components/Uploads/StoryCoverUpload";
import { useStoriesNewQuery } from "../generated/graphql";

export default function Home() {
  const [storyNewCursor, setStoryNewCursor] = useState(null);

  const { data, loading, error } = useStoriesNewQuery({
    variables: {
      limit: 10,
      cursor: storyNewCursor,
    },
  });

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <>
      <StoryNavbar />
      <div className="mt-16 container mx-auto px-8 pb-2 font-medium text-2xl border-b-2 border-gray-100">
        New Stories
      </div>
      <StoryCarousel>
        {data?.getNewStories.stories.map((story, idx) => (
          <Card key={idx} title={story.title} coverUrl={story.cover_url} />
        ))}
      </StoryCarousel>
      {/* <StoryCoverUpload storyId={3} /> */}
    </>
  );
}
