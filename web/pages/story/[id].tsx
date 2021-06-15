import { NextPage } from "next";
import React from "react";
import Avatar from "../../components/Containers/Avatar";
import Hero from "../../components/Containers/Hero";
import ReviewList from "../../components/List/ReviewList";
import AuthNavbar from "../../components/Navbars/AuthNavbar";
import { useMeQuery, useUpdateStoryMutation } from "../../generated/graphql";
import { useGetStoryFromUrl } from "../../utils/hooks";
import FormTextArea from "../../components/Forms/FormTextArea";

interface StoryProps {}

const StoryPage: NextPage<StoryProps> = ({}) => {
  const { data: storyData } = useGetStoryFromUrl();
  const { data: meData } = useMeQuery();
  const [updateStoryMutation] = useUpdateStoryMutation();

  if (!storyData) {
    return <div>loading page...</div>;
  }

  const updateStoryTitle = async (title: string) => {
    await updateStoryMutation({
      variables: {
        id: storyData.getStoryById?.id as number,
        title: title,
        overview: storyData.getStoryById?.overview as string,
      },
    });
  };

  const updateStoryOverview = async (overview: string) => {
    await updateStoryMutation({
      variables: {
        id: storyData.getStoryById?.id as number,
        title: storyData.getStoryById?.title as string,
        overview: overview,
      },
    });
  };

  return (
    <>
      <AuthNavbar />
      <div className="mt-16 container mx-auto">
        <Hero
          data={storyData}
          updateMutation={updateStoryTitle}
          enableEdit={storyData.getStoryById?.creator.id === meData?.me?.id}
          storyLink={`/content/${storyData.getStoryById?.id}`}
        />
        <section className="my-4 mx-auto md:w-10/12 px-5">
          <FormTextArea
            label="Overview"
            submitMutation={updateStoryOverview}
            value={storyData.getStoryById?.overview as string}
            className="mb-4"
            enableEdit={storyData.getStoryById?.creator.id === meData?.me?.id}
          />
        </section>
        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800">
            About Author
          </h6>
          <div className="flex">
            <Avatar avatarUrl={meData?.me?.avatar_url} />
            <div className="mt-1 text-base ml-4">
              <div className="capitalize text-xl">
                {storyData.getStoryById?.creator.username}
              </div>
              <p className="mt-1 text-base">
                Donec et vestibulum mi. Morbi nec purus accumsan, porttitor
                risus id, viverra lectus. Nunc arcu augue, malesuada at lacinia
                id, feugiat vitae neque. Maecenas malesuada vestibulum mauris,
                in fermentum augue tincidunt vel. Proin tristique erat a tempor
                bibendum. Nunc lobortis ex orci, et commodo dui rhoncus vel. In
                non nunc fermentum, cursus nulla id, semper sapien. Quisque
                sodales purus non sapien egestas rhoncus. Mauris sed est sed
                tortor fermentum ullamcorper vitae ac libero. Morbi quis mauris
                tempus, gravida lacus a, mollis eros. Praesent ultricies lacus
                ut elit cursus vulputate. Phasellus tincidunt tellus libero, in
                tincidunt magna pretium quis. Morbi vulputate elementum nisl
                quis varius. Fusce at sapien non magna aliquet ullamcorper vel
                non dolor.
              </p>
            </div>
          </div>
        </section>
        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800">
            Related News
          </h6>
          <div className="h-56 w-full border border-pink-200">
            news articles
          </div>
        </section>

        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800">
            Reviews
          </h6>
          <ReviewList
            storyId={storyData.getStoryById?.id as number}
            storyCreatorId={storyData.getStoryById?.creator.id}
          />
        </section>
      </div>
    </>
  );
};

export default StoryPage;
