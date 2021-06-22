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

  const renderMD = (mdList: any) => {
    if (mdList && mdList.length > 0) {
      return mdList.map(
        (substr: { text: string }, idx: React.Key | null | undefined) => (
          <React.Fragment key={idx}>
            <ReactMarkdown
              children={substr.text}
              remarkPlugins={[[gfm, { singleTilde: false }]]}
              className="px-3 py-2 w-full prose border-b border-blue-200"
            />
          </React.Fragment>
        )
      );
    }
  };

  return (
    <>
      <StoryNavBar />
      {/* <MDEditor /> */}
      <div className="mt-24 container mx-auto flex flex-col sm:flex-row ">
        <div className="border p-4 min-h-screen flex-1">
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
                <div key={`subtitle${idx}`}>{substory.title}</div>
              ))
            : null}
        </div>

        <MDModal isOpen={isOpen} setIsOpen={setIsOpen} storyId={storyId} />
      </div>
    </>
  );
};

export default StoryContent;