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
    <div className="dark:bg-gray-800 dark:text-white transition-colors ease duration-300 min-h-screen">
      <StoryNavbar />

      <div className="pt-20 container mx-auto">
        <div className="px-8 pb-2 mb-2 font-medium text-2xl border-b-2 border-gray-100 dark:border-gray-700 transition-colors ease duration-300">
          New Stories
        </div>
        <StoryCarousel loadMoreCallback={fetchMoreNew}>
          {dataNew?.getNewStories.stories.map((story, idx) => (
            <Link href={`/story/${encodeURIComponent(story.id)}`} key={idx}>
              <a className="block relative mx-auto w-48 h-80 bg-white dark:bg-gray-800 hover:bg-blue-100 hover:shadow-md dark:hover:bg-blue-800 transition-colors ease duration-300">
                <Card
                  title={story.title}
                  coverUrl={story.cover_url}
                  author={story.creator.username}
                  upvote={story.up_vote}
                  downvote={story.down_vote}
                />
              </a>
            </Link>
          ))}
        </StoryCarousel>
      </div>

      <div className="mt-8 pb-8 container mx-auto">
        <div className="px-8 pb-2 mb-2 font-medium text-2xl border-b-2 border-gray-100 dark:border-gray-700 transition-colors ease duration-300">
          Top Stories
        </div>
        <StoryCarousel loadMoreCallback={fetchMoreTop}>
          {dataTop?.getTopStories.stories.map((story, idx) => (
            <Link href={`/story/${encodeURIComponent(story.id)}`} key={idx}>
              <a className="block relative mx-auto w-48 h-80 bg-white dark:bg-gray-800 hover:bg-blue-100 hover:shadow-md dark:hover:bg-blue-800 transition-colors ease duration-300">
                <Card
                  title={story.title}
                  coverUrl={story.cover_url}
                  author={story.creator.username}
                  upvote={story.up_vote}
                  downvote={story.down_vote}
                />
              </a>
            </Link>
          ))}
        </StoryCarousel>
      </div>
    </div>
  );
}
