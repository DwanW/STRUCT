import React from "react";
import { GetStoryByIdQuery } from "../../generated/graphql";
import FormTextArea from "../Forms/FormTextArea";
import Link from "next/link";
import FormTag from "../Forms/FormTag";
import StoryCoverUpload from "../Uploads/StoryCoverUpload";

interface HeroProps {
  data: GetStoryByIdQuery;
  enableEdit?: boolean;
  updateTitleMutation: Function;
  updateTagsMutation: Function;
  storyLink: string;
}

const Hero: React.FC<HeroProps> = ({
  data,
  enableEdit = false,
  updateTitleMutation,
  updateTagsMutation,
  storyLink,
}) => {
  return (
    <div className="flex flex-wrap items-center">
      <div className="relative group w-full h-96 mx-auto md:w-4/12 px-4">
        <img
          alt="story cover"
          className="w-full h-full rounded-lg shadow-lg object-cover"
          src={data.getStoryById?.cover_url || "/img/story-default.svg"}
        />
        <div
          className={`absolute opacity-0 top-0 left-0 rounded-lg ${
            enableEdit ? "group-hover:opacity-100" : ""
          } w-full h-full`}
        >
          <StoryCoverUpload storyId={data.getStoryById?.id as number} />
        </div>
      </div>
      <div className="w-full md:w-5/12 mx-auto px-4">
        <div className="px-1 md:pr-12">
          <h3 className="mt-8 text-3xl font-semibold capitalize">
            <FormTextArea
              label="Title"
              submitMutation={updateTitleMutation}
              value={data.getStoryById?.title as string}
              className="mb-4"
              showTitle={false}
              enableEdit={enableEdit}
            />
          </h3>
          <div className="mt-4 text-lg">Reviews: descriptive word</div>
          <div className="mt-4 text-sm">
            Publish Date:{" "}
            {new Date(
              data.getStoryById?.createdAt as string
            ).toLocaleDateString("en", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </div>
          <div className="mt-4 text-sm">
            Author: {data.getStoryById?.creator.username}
          </div>
          <div>
            <FormTag
              label="Tag"
              submitMutation={updateTagsMutation}
              value={data.getStoryById?.tags as string}
              className="mb-4"
              showTitle={false}
              enableEdit={enableEdit}
            />
          </div>
          <Link href={storyLink}>
            <a className="bg-green-500 flex w-40 text-white font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150">
              <img
                alt="icon"
                className="w-6 h-6 mr-2 text-green-800 inline"
                src="/img/book-open.svg"
              />{" "}
              Open
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
