import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCreateStoryMutation } from "../../generated/graphql";

interface CreateStoryProps {}

const CreateStory: React.FC<CreateStoryProps> = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  const [createStoryMutation] = useCreateStoryMutation();

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const newStory = await createStoryMutation({
        variables: {
          storyInput: {
            title: title,
            overview: overview,
          },
        },
      });
      router.push(`/story/${newStory.data?.createStory.id}`);
    } catch (error) {
      console.log(error, "create story failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex flex-col">
        <h4 className="text-left text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Write a Story
        </h4>
        <div className="mt-2">
          <span>Title</span>
          <input
            type="text"
            className="form-text block w-full text-black bg-white dark:text-white dark:bg-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <span>Overview</span>
          <textarea
            className="h-40 p-4 form-textarea block w-full text-black bg-white dark:text-white dark:bg-gray-700"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className={`bg-green-500 flex text-white flex-initial w-min font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer hover:bg-green-700 ${
            !(!!title && !!overview) ? "disabled:opacity-50" : ""
          }`}
          type="submit"
          disabled={!(!!title && !!overview)}
        >
          Submit
        </button>
        <button
          className="text-gray-700 bg-gray-300 flex-initial w-min font-bold uppercase text-base px-4 py-1 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer hover:bg-gray-400"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateStory;
