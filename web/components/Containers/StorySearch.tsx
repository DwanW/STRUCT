import Link from "next/link";
import React from "react";
import { useSearchStoryQuery } from "../../generated/graphql";
import defineRating from "../../utils/defineRating";
import StoryNavbar from "../Navbars/StoryNavbar";

interface StorySearchProps {
  value: string;
  tag?: string;
}

const StorySearch: React.FC<StorySearchProps> = ({ value, tag }) => {
  const { data, loading, error, fetchMore } = useSearchStoryQuery({
    variables: {
      limit: 10,
      title: value,
      cursor: null,
      tags: tag,
    },
  });

  //   const fetchMoreSearch = () => {
  //     if (data?.searchStory?.next_cursor) {
  //       fetchMore({
  //         variables: {
  //           title: value,
  //           tags: tag,
  //           limit: 10,
  //           cursor: data.searchStory.next_cursor?.id,
  //         },
  //       });
  //     }
  //   };

  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-white transition-colors ease duration-300">
      <StoryNavbar />
      <div className="pt-20 px-4 container mx-auto">
        <div className="my-4">
          Search Result for <span className="font-bold">{value}</span>
        </div>
        {data?.searchStory?.stories.map((story) => (
          <Link href={`/story/${encodeURIComponent(story.id)}`} key={story.id}>
            <a className="rounded w-full sm:h-56 flex flex-col sm:flex-row shadow-md bg-white dark:bg-gray-800 transition-colors ease duration-300 hover:bg-blue-100 hover:shadow-md dark:hover:bg-blue-800">
              <img
                className="w-full sm:w-48 h-48 sm:h-full z-0 object-cover rounded"
                src={
                  story.cover_url ? story.cover_url : "/img/story-default.svg"
                }
              />
              <div className="p-4">
                <div className="font-semibold text-2xl capitalize text-gray-800 dark:text-white">
                  {story.title}
                </div>
                <div className="text-base pt-2 text-gray-600 dark:text-gray-300">
                  {story.creator.username}
                </div>
                <div className="text-base pt-2 text-gray-800 dark:text-white">
                  Rating: {defineRating(story.up_vote, story.down_vote)}
                </div>
                <div className="text-lg pt-2 text-gray-800 dark:text-white">
                  Overview:{" "}
                  {story.overview
                    ? story.overview.slice(0, 100)
                    : "no overview added"}
                </div>
                <div className="sm:hidden border-b border-blue-400" />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StorySearch;
