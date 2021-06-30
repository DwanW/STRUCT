import { NextPage } from "next";
import { useGetMyStoriesQuery } from "../../generated/graphql";
import Card from "../../components/Containers/Card";
import Link from "next/link";
import SideNav from "../../components/Navbars/SideNav";

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
    <div className="flex flex-row">
      <SideNav />
      <main className="profile-page min-h-screen bg-white-100 flex-1">
        {data.getMyStories?.stories.map((story, idx) => (
          <Link href={`/story/${encodeURIComponent(story.id)}`} key={idx}>
            <a className="inline-block relative mx-4 w-48 h-80 hover:bg-blue-100 hover:shadow-md">
              <Card title={story.title} coverUrl={story.cover_url} />
            </a>
          </Link>
        ))} 
      </main>
    </div>
  );
};

export default Stories;
