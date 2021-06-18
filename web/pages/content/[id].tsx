import { NextPage } from "next";
import MDEditor from "../../components/Forms/MDEditor";
import StoryNavBar from "../../components/Navbars/StoryNavbar";
import ReactMarkdown from "react-markdown";

interface StoryContentProps {}

const StoryContent: NextPage<StoryContentProps> = ({}) => {
  return (
    <>
      <StoryNavBar />
      {/* <MDEditor /> */}
      <div className="mt-24 container mx-auto flex flex-row">
        <div className="border border-black p-4 min-h-screen">
          this is the markdown display of a substory
        </div>
        <div className="w-full sm:w-[300px] border border-black">321</div>
      </div>
    </>
  );
};

export default StoryContent;
