import { useEffect, useState } from "react";
import StoryCarousel from "../components/Carousel/StoryCarousel";
import Card from "../components/Containers/Card";
import StoryNavbar from "../components/Navbars/StoryNavbar";
import StoryCoverUpload from "../components/Uploads/StoryCoverUpload";
import { useStoriesNewQuery } from "../generated/graphql";

export default function Home() {
  const [storyNewCursor, setStoryNewCursor] = useState<number | null>(null);

  const { data, fetchMore } = useStoriesNewQuery({
    variables: {
      limit: 5,
      cursor: null,
    },
  });

  useEffect(() => {
    if (data?.getNewStories.next_cursor?.id) {
      setStoryNewCursor(data.getNewStories.next_cursor?.id);
    }
  });

  if (!data) {
    return <div>loading...</div>;
  }

  const fetchMoreStory = () => {
    if (data.getNewStories.next_cursor) {
      fetchMore({
        variables: {
          limit: 5,
          cursor: storyNewCursor,
        },
      });
    }
  };

  return (
    <>
      <StoryNavbar />
      <div className="mt-16 container mx-auto px-8 pb-2 font-medium text-2xl border-b-2 border-gray-100">
        New Stories
      </div>
      <StoryCarousel loadMoreCallback={fetchMoreStory}>
        {data?.getNewStories.stories.map((story, idx) => (
          <Card key={idx} title={story.title} coverUrl={story.cover_url} />
        ))}
      </StoryCarousel>
      {/* <div className="container mx-auto mt-10">
        <StoryCoverUpload storyId={3} />
      </div> */}
    </>
  );
}
