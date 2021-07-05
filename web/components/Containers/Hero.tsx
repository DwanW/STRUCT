import React from "react";
import { GetStoryByIdQuery } from "../../generated/graphql";
import FormTextArea from "../Forms/FormTextArea";
import Link from "next/link";

interface HeroProps {
  data: GetStoryByIdQuery;
  enableEdit?: boolean;
  updateMutation: Function;
  storyLink: string;
}

const Hero: React.FC<HeroProps> = ({
  data,
  enableEdit = false,
  updateMutation,
  storyLink,
}) => {
  return (
    <div className="flex flex-wrap items-center">
      <div className="w-full h-96 mx-auto md:w-4/12 px-4">
        <img
          alt="story cover"
          className="w-full h-full rounded-lg shadow-lg object-cover"
          src={data.getStoryById?.cover_url || "/img/story-default.svg"}
        />
      </div>
      <div className="w-full md:w-5/12 mx-auto px-4">
        <div className="px-1 md:pr-12">
          <h3 className="mt-8 text-3xl font-semibold capitalize">
            <FormTextArea
              label="Title"
              submitMutation={updateMutation}
              value={data.getStoryById?.title as string}
              className="mb-4"
              showTitle={false}
              enableEdit={enableEdit}
            />
          </h3>
          <div className="mt-4 text-lg">Reviews: descriptive word</div>
          <div className="mt-4 text-sm">
            Publish Date: {new Date(data.getStoryById?.createdAt as string).toLocaleDateString("en", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </div>
          <div className="mt-4 text-sm">
            Author: {data.getStoryById?.creator.username}
          </div>
          <ul className="list-none mt-6 flex flex-wrap">
            <li className="py-2">
              <div className="flex items-center">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-500 bg-blue-100 mr-3">
                    Icon1
                  </span>
                </div>
                <div>
                  <h4 className="text-blue-500">Tag 1</h4>
                </div>
              </div>
            </li>
            <li className="py-2">
              <div className="flex items-center">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-500 bg-blue-100 mr-3">
                    Icon 2
                  </span>
                </div>
                <div>
                  <h4 className="text-blue-500">Tag 2</h4>
                </div>
              </div>
            </li>
            <li className="py-2">
              <div className="flex items-center">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-500 bg-blue-100 mr-3">
                    Icon 3
                  </span>
                </div>
                <div>
                  <h4 className="text-blue-500">Tag 3</h4>
                </div>
              </div>
            </li>
          </ul>
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
