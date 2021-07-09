import { NextPage } from "next";
import CreateStory from "../../components/Forms/CreateStory";
import StoryNavbar from "../../components/Navbars/StoryNavbar";

interface CreateStoryPageProps {}

const CreateStoryPage: NextPage<CreateStoryPageProps> = ({}) => {
  return (
    <div className="dark:bg-gray-800 dark:text-white transition-colors ease duration-300">
      <StoryNavbar />
      <div className="pt-24 container mx-auto px-10 min-h-screen">
          <CreateStory />
      </div>
    </div>
  );
};

export default CreateStoryPage;
