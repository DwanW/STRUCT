import { NextPage } from "next";
import CreateStory from "../../components/Forms/CreateStory";
import StoryNavbar from "../../components/Navbars/StoryNavbar";

interface CreateStoryPageProps {}

const CreateStoryPage: NextPage<CreateStoryPageProps> = ({}) => {
  return (
    <div>
      <StoryNavbar />
      <div className="mt-24 container mx-auto px-10">
          <CreateStory />
      </div>
    </div>
  );
};

export default CreateStoryPage;
