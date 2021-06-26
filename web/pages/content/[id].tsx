import { NextPage } from "next";
import StoryNavBar from "../../components/Navbars/StoryNavbar";
import MDModal from "../../components/Containers/MDModal";
// import MDEditor from "../../components/Forms/MDEditor";
import React, { useState } from "react";
import { useGetIdFromUrl } from "../../utils/hooks";
import { useGetSubStoriesFromStoryIdQuery } from "../../generated/graphql";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface StoryContentProps {}

const StoryContent: NextPage<StoryContentProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const storyId = useGetIdFromUrl();

  const { data, loading, error } = useGetSubStoriesFromStoryIdQuery({
    skip: storyId < 0,
    variables: {
      storyId: storyId,
    },
  });

  const scrollToSubStory = (subStoryId: number) => {
    const element = document.getElementById(subStoryId.toString());
    if (element) {
      element?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const renderMD = (mdList: any) => {
    if (mdList && mdList.length > 0) {
      return mdList.map(
        (
          substr: { text: string; id: number },
          idx: React.Key | null | undefined
        ) => (
          <div key={idx} id={`${substr.id}`}>
            <ReactMarkdown
              children={substr.text}
              remarkPlugins={[[gfm, { singleTilde: false }]]}
              className="px-3 py-2 w-full prose mx-auto border-b border-blue-200"
            />
          </div>
        )
      );
    }
  };

  return (
    <>
      <StoryNavBar />
      {/* <MDEditor /> */}
      <div className="mt-24 container mx-auto flex flex-col sm:flex-row ">
        <div className="border p-4 h-screen flex-1 overflow-y-scroll">
          {renderMD(data?.getSubStoriesFromStoryId)}
        </div>
        <div className="w-full sm:w-[300px] border flex flex-col items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green-500 w-3/4 text-white text-center font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none my-4 ease-linear transition-all duration-150"
          >
            Add Sub-Section
          </button>
          {data?.getSubStoriesFromStoryId
            ? data.getSubStoriesFromStoryId.map((substory, idx) => (
                <div
                  key={`subtitle${idx}`}
                  className="px-4 py-2 w-full text-lg font-bold hover:shadow cursor-pointer hover:bg-gray-200"
                  onClick={() => scrollToSubStory(substory.id)}
                >
                  {substory.title}
                </div>
              ))
            : null}
        </div>

        <MDModal isOpen={isOpen} setIsOpen={setIsOpen} storyId={storyId} />
      </div>
    </>
  );
};

export default StoryContent;
