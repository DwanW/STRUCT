import { NextPage } from "next";
import StoryNavBar from "../../components/Navbars/StoryNavbar";
import MDModal from "../../components/Containers/MDModal";
// import MDEditor from "../../components/Forms/MDEditor";
import { useState } from "react";
import { useGetIdFromUrl } from "../../utils/hooks";
import { useGetSubStoriesFromStoryIdQuery } from "../../generated/graphql";

interface StoryContentProps {}

const StoryContent: NextPage<StoryContentProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const storyId = useGetIdFromUrl();

  const { data, loading, error } = useGetSubStoriesFromStoryIdQuery({
    variables: {
      storyId: storyId,
    },
  });

  return (
    <>
      <StoryNavBar />
      {/* <MDEditor /> */}
      <div className="mt-24 container mx-auto flex flex-col sm:flex-row">
        <div className="border border-black p-4 min-h-screen flex-1">
          this is the markdown display of a substory
        </div>
        <div className="w-full sm:w-[300px] border border-black flex flex-col items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green-500 w-3/4 text-white text-center font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none my-4 ease-linear transition-all duration-150"
          >
            Add Sub-Section
          </button>
          {data?.getSubStoriesFromStoryId
            ? data.getSubStoriesFromStoryId.map((substory) => substory.title)
            : null}
        </div>

        <MDModal isOpen={isOpen} setIsOpen={setIsOpen} storyId={storyId} />
      </div>
    </>
  );
};

export default StoryContent;
