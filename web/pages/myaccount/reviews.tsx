import { NextPage } from "next";
import {
  useGetRecentUserReviewsQuery,
  useMeQuery,
} from "../../generated/graphql";
import SideNav from "../../components/Navbars/SideNav";

interface reviewsProps {}

const Reviews: NextPage<reviewsProps> = ({}) => {
  const { data: meData } = useMeQuery();

  const { data, loading, fetchMore } = useGetRecentUserReviewsQuery({
    skip: meData?.me?.id === null,
    variables: {
      limit: 10,
      cursor: null,
      //   time_range:30,
      userId: meData?.me?.id as number,
    },
  });

  if (loading || !data) {
    return <div>loading review</div>;
  }

  if (data && data.getRecentUserReviews?.reviews.length === 0) {
    return <div>I have not wrote any reviews yet.</div>;
  }

  return (
    <div className="flex flex-row">
      <SideNav />
      <main className="profile-page min-h-screen bg-white-100 flex-1">
        {data.getRecentUserReviews?.reviews.map((review, idx) => (
          <div key={idx}>
            {review.id} {review.type} {review.text}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Reviews;
