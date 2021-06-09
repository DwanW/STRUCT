import { NextPage } from "next";
import StoryNavbar from "../../components/Navbars/StoryNavbar";
import { useGetMyStoriesQuery } from "../../generated/graphql";

interface storiesProps {}

const Stories: NextPage<storiesProps> = ({}) => {
  const { data, loading } = useGetMyStoriesQuery({
    variables: {
      limit: 5,
      cursor: null,
    },
  });

  if (loading || !data) {
    return <div>loading review</div>;
  }

  if (data && data.getMyStories?.stories.length === 0) {
    return <div>I have not wrote any story yet.</div>;
  }

  return (
    <>
      <StoryNavbar />
      <main className="mt-24 container mx-auto p-4">
        <h4>My stories</h4>
        {data.getMyStories?.stories.map((story, idx) => (
          <div key={idx}>{story.title}</div>
        ))}
      </main>
    </>
  );
};

export default Stories;
