import Link from "next/link";
import { useEffect, useState } from "react";
import StoryCarousel from "../components/Carousel/StoryCarousel";
import Card from "../components/Containers/Card";
import StoryNavbar from "../components/Navbars/StoryNavbar";
import StoryCoverUpload from "../components/Uploads/StoryCoverUpload";
import {
  TopStoryCursor,
  useStoriesNewQuery,
  useStoriesTopQuery,
} from "../generated/graphql";

export default function Home() {
  const { data: dataNew, fetchMore: fetchMoreNewStory } = useStoriesNewQuery({
    variables: {
      limit: 5,
      cursor: null,
    },
  });

  const { data: dataTop, fetchMore: fetchMoreTopStory } = useStoriesTopQuery({
    variables: {
      limit: 5,
      cursor: null,
      // time_range: 30, //30 days
    },
  });

  if (!dataNew || !dataTop) {
    return <div>loading...</div>;
  }

  const fetchMoreNew = () => {
    if (dataNew?.getNewStories.next_cursor) {
      fetchMoreNewStory({
        variables: {
          limit: 5,
          cursor: dataNew.getNewStories.next_cursor?.id,
        },
      });
    }
  };

  const fetchMoreTop = () => {
    if (dataTop?.getTopStories.next_cursor) {
      let newCursor: TopStoryCursor = {
        id: dataTop.getTopStories.next_cursor.id,
        net_up_votes:
          dataTop.getTopStories.next_cursor.up_vote -
          dataTop.getTopStories.next_cursor.down_vote,
      };
      fetchMoreTopStory({
        variables: {
          limit: 5,
          cursor: newCursor,
        },
      });
    }
  };

  return (
    <>
      <StoryNavbar />
      <div className="mt-24 container mx-auto">
        <div className="px-8 pb-2 font-medium text-2xl border-b-2 border-gray-100">
          Recommended For you
        </div>
        <StoryCarousel loadMoreCallback={fetchMoreNew}>
          {dataNew?.getNewStories.stories.map((story, idx) => (
            <Link href={`/story/${encodeURIComponent(story.id)}`} key={idx}>
              <a className="block relative mx-auto w-48 h-80 hover:bg-blue-100 hover:shadow-md">
                <Card title={story.title} coverUrl={story.cover_url} />
              </a>
            </Link>
          ))}
        </StoryCarousel>
      </div>

      <div className="mt-8 container mx-auto">
        <div className="px-8 pb-2 font-medium text-2xl border-b-2 border-gray-100">
          New Stories
        </div>
        <StoryCarousel loadMoreCallback={fetchMoreNew}>
          {dataNew?.getNewStories.stories.map((story, idx) => (
            <Link href={`/story/${encodeURIComponent(story.id)}`} key={idx}>
              <a className="block relative mx-auto w-48 h-80 hover:bg-blue-100 hover:shadow-md">
                <Card title={story.title} coverUrl={story.cover_url} />
              </a>
            </Link>
          ))}
        </StoryCarousel>
      </div>

      <div className="mt-8 container mx-auto">
        <div className="px-8 pb-2 font-medium text-2xl border-b-2 border-gray-100">
          Top Stories
        </div>
        <StoryCarousel loadMoreCallback={fetchMoreTop}>
          {dataTop?.getTopStories.stories.map((story, idx) => (
            <Link href={`/story/${encodeURIComponent(story.id)}`} key={idx}>
              <a className="block relative mx-auto w-48 h-80 hover:bg-blue-100 hover:shadow-md">
                <Card title={story.title} coverUrl={story.cover_url} />
              </a>
            </Link>
          ))}
        </StoryCarousel>
      </div>

      {/* <div className="container mx-auto mt-10">
        <StoryCoverUpload storyId={3} />
      </div> */}
    </>
  );
}
