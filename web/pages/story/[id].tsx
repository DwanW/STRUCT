import { NextPage } from "next";
import React from "react";
import Hero from "../../components/Containers/Hero";
import ReviewList from "../../components/List/ReviewList";
import AuthNavbar from "../../components/Navbars/AuthNavbar";
import { useGetStoryFromUrl } from "../../utils/hooks";

interface StoryProps {}

const StoryPage: NextPage<StoryProps> = ({}) => {
  const { data } = useGetStoryFromUrl();
  console.log(data);

  if (!data) {
    return <div>loading page...</div>;
  }

  return (
    <>
      <AuthNavbar />
      <div className="mt-16 container mx-auto">
        <Hero data={data} />
        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800">
            Overview
          </h6>
          <p className="mt-1 text-base">
            The extension comes with three pre-built pages to help you get
            started faster. You can change the text and images and you're good
            to go.
          </p>
        </section>
        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800">
            About Author
          </h6>
          <div className="flex">
            <img
              alt="author avatar"
              className="w-16 h-16 rounded-full align-middle border-none shadow-lg"
              src="/img/user-default.svg"
            />
            <div className="mt-1 text-base ml-4">
              <div className="capitalize text-xl">
                {data.getStoryById?.creator.username}
              </div>
              <p className="mt-1 text-base">
                The extension comes with three pre-built pages to help you get
                started faster. You can change the text and images and you're
                good to go.
              </p>
            </div>
          </div>
        </section>
        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800">
            Related News
          </h6>
          <div className="h-56 w-full border-2 border-pink-800">
            news articles
          </div>
        </section>

        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800">
            Reviews
          </h6>
          <ReviewList storyId={data.getStoryById?.id as number} />
        </section>
      </div>
    </>
  );
};

export default StoryPage;