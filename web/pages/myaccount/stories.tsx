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
      <main className="profile-page min-h-screen bg-blue-100 dark:bg-gray-800 flex-1">
        {data.getMyStories?.stories.map((story, idx) => (
          <Link href={`/story/${encodeURIComponent(story.id)}`} key={idx}>
            <a className="inline-block relative mx-4 w-48 h-80 bg-white dark:bg-gray-800 hover:bg-blue-100 hover:shadow-md dark:hover:bg-blue-800 transition-colors ease duration-300">
              <Card
                title={story.title}
                coverUrl={story.cover_url}
                author={story.creator.username}
                upvote={story.up_vote}
                downvote={story.down_vote}
              />
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Stories;
