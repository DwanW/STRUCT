import { NextPage } from "next";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import StoryNavbar from "../components/Navbars/StoryNavbar";
import Avatar from "../components/Containers/Avatar";

interface MyAccountPageProps {}

const MyAccountPage: React.FC<NextPage<MyAccountPageProps>> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({
    onCompleted: (data) => {
      if (!data.me?.id) {
        router.push("/auth/login");
      }
    },
  });

  if (loading || !data?.me) {
    return <div>loading profile</div>;
  }

  return (
    <>
      <div>NavBar for user?</div>
      <div>
        <Avatar avatarUrl={data.me.avatar_url} />
        <div>about: {data.me.about}</div>
      </div>
    </>
  );
};

export default MyAccountPage;
