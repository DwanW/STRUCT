import { NextPage } from "next";
import React from "react";
import Avatar from "../../components/Containers/Avatar";
import Hero from "../../components/Containers/Hero";
import ReviewList from "../../components/List/ReviewList";
import StoryNavbar from "../../components/Navbars/StoryNavbar";
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

  // refactor
  const updateStoryTitle = async (title: string) => {
    await updateStoryMutation({
      variables: {
        id: storyData.getStoryById?.id as number,
        title: title,
        overview: storyData.getStoryById?.overview as string,
        tags: storyData.getStoryById?.tags as string,
      },
    });
  };

  const updateStoryOverview = async (overview: string) => {
    await updateStoryMutation({
      variables: {
        id: storyData.getStoryById?.id as number,
        title: storyData.getStoryById?.title as string,
        overview: overview,
        tags: storyData.getStoryById?.tags as string,
      },
    });
  };

  const updateStoryTags = async (tags: string) => {
    await updateStoryMutation({
      variables: {
        id: storyData.getStoryById?.id as number,
        title: storyData.getStoryById?.title as string,
        overview: storyData.getStoryById?.overview as string,
        tags: tags,
      },
    });
  };

  return (
    <div className="dark:bg-gray-800 dark:text-white transition-colors ease duration-300">
      <StoryNavbar />
      <div className="pt-16 container mx-auto">
        <Hero
          data={storyData}
          updateTitleMutation={updateStoryTitle}
          updateTagsMutation={updateStoryTags}
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
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800 dark:text-blue-200">
            About Author
          </h6>
          <div className="flex">
            <Avatar avatarUrl={meData?.me?.avatar_url} />
            <div className="mt-1 text-base ml-4">
              <div className="capitalize text-xl">
                {storyData.getStoryById?.creator.username}
              </div>
              <p className="mt-1 text-base">
                {storyData.getStoryById?.creator.about}
              </p>
            </div>
          </div>
        </section>
        <section className="my-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800 dark:text-blue-200">
            Related News
          </h6>
          <div className="h-56 w-full border border-pink-200">
            news articles
          </div>
        </section>

        <section className="mt-4 pb-4 mx-auto md:w-10/12 px-5">
          <h6 className="text-xl font-normal leading-normal mb-2 text-blue-800 dark:text-blue-200">
            Reviews
          </h6>
          <ReviewList
            storyId={storyData.getStoryById?.id as number}
            storyCreatorId={storyData.getStoryById?.creator.id}
          />
        </section>
      </div>
    </div>
  );
};

export default StoryPage;
