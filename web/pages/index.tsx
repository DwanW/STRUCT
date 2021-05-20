import { useState } from "react";
import Card from "../components/Containers/Card";
import StoryNavbar from "../components/Navbars/StoryNavbar";
// import StoryCoverUpload from "../components/Uploads/StoryCoverUpload";
import { useStoriesNewQuery } from "../generated/graphql";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home() {
  const [storyNewCursor, setStoryNewCursor] = useState(null);

  const { data, loading, error } = useStoriesNewQuery({
    variables: {
      limit: 10,
      cursor: storyNewCursor,
    },
  });

  if(!data){
    return(
      <div>loading...</div>
    )
  }
  return (
    <>
      <StoryNavbar />
      <div className="mt-16 container mx-auto px-8 pb-2 font-medium text-2xl border-b-2 border-gray-100">
        New Stories
      </div>
      <div className="">
        <Carousel responsive={responsive} ssr={true}>
          {data?.getNewStories.stories.map((story, idx) => (
            <div className="" key={idx}>
              <Card title={story.title} coverUrl={story.cover_url} />
            </div>
          ))}
        </Carousel>
      </div>
      {/* <StoryCoverUpload storyId={3} /> */}
    </>
  );
}
