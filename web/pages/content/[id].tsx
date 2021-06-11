import { NextPage } from "next";
import MDEditor from "../../components/Forms/MDEditor";

interface StoryContentProps {}

const StoryContent: NextPage<StoryContentProps> = ({}) => {
  return (
    <div>
      <MDEditor />
    </div>
  );
};

export default StoryContent;
