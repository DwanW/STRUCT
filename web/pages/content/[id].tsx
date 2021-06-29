import { NextPage } from "next";
import StoryNavBar from "../../components/Navbars/StoryNavbar";
import MDModal from "../../components/Containers/MDModal";
// import MDEditor from "../../components/Forms/MDEditor";
import React, { useState } from "react";
import { useGetIdFromUrl } from "../../utils/hooks";
import {
  DeleteSubStoryByIdMutation,
  GetSubStoriesFromStoryIdDocument,
  GetSubStoriesFromStoryIdQuery,
  SubStory,
  useDeleteSubStoryByIdMutation,
  useGetSubStoriesFromStoryIdQuery,
} from "../../generated/graphql";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { ApolloCache, ApolloClient } from "@apollo/client";

interface StoryContentProps {}

const StoryContent: NextPage<StoryContentProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const storyId = useGetIdFromUrl();
  const [editSubStory, setEditSubStory] = useState<Pick<
    SubStory,
    | "storyId"
    | "id"
    | "title"
    | "text"
    | "order_index"
    | "createdAt"
    | "updatedAt"
  > | null>(null);

  const { data, loading, error } = useGetSubStoriesFromStoryIdQuery({
    skip: storyId < 0,
    variables: {
      storyId: storyId,
    },
  });

  const [deleteSubStoryByIdMutation, { loading: deleting }] =
    useDeleteSubStoryByIdMutation();

  const deleteUpdate = (
    cache: ApolloCache<DeleteSubStoryByIdMutation>,
    substoryId: number
  ) => {
    if (!storyId) return;
    cache.modify({
      id: cache.identify({ __typename: "Query" }),
      fields: {
        getSubStoriesFromStoryId: (
          existing: [
            Pick<
              SubStory,
              | "storyId"
              | "id"
              | "title"
              | "text"
              | "order_index"
              | "createdAt"
              | "updatedAt"
            >
          ],
          { readField }
        ) => {
          return existing.filter(
            (substory) => readField("id", substory) !== substoryId
          );
        },
      },
    });
  };

  const scrollToSubStory = (subStoryId: number) => {
    const element = document.getElementById(subStoryId.toString());
    if (element) {
      element?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const renderMD = (mdList: any) => {
    if (mdList && mdList.length > 0) {
      return mdList.map(
        (
          substr: { text: string; id: number },
          idx: React.Key | null | undefined
        ) => (
          <div key={idx} id={`${substr.id}`}>
            <ReactMarkdown
              children={substr.text}
              remarkPlugins={[[gfm, { singleTilde: false }]]}
              className="px-3 py-2 w-full prose mx-auto border-b border-blue-200"
            />
          </div>
        )
      );
    }
  };

  return (
    <>
      <StoryNavBar />
      {/* <MDEditor /> */}
      <div className="mt-24 container mx-auto flex flex-col sm:flex-row ">
        <div className="border p-4 h-screen flex-1 overflow-y-scroll">
          {renderMD(data?.getSubStoriesFromStoryId)}
        </div>
        <div className="w-full sm:w-[300px] border flex flex-col items-center">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setEditSubStory(null);
            }}
            className="bg-green-500 w-3/4 text-white text-center font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none my-4 ease-linear transition-all duration-150"
          >
            Add Sub-Section
          </button>
          {data?.getSubStoriesFromStoryId
            ? data.getSubStoriesFromStoryId.map((substory, idx) => (
                <React.Fragment key={`subtitle${idx}`}>
                  <div
                    className="group px-4 py-2 w-full text-lg font-bold hover:shadow cursor-pointer hover:bg-gray-200 relative"
                    onClick={() => scrollToSubStory(substory.id)}
                  >
                    <div>{substory.title}</div>

                    <button
                      className="absolute sm:hidden  bg-gray-100 rounded-full top-2 right-12 cursor-pointer text-gray-400 group-hover:block z-10"
                      onClick={() => {
                        setEditSubStory(substory);
                        setIsOpen(!isOpen);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      className="absolute sm:hidden bg-gray-100 rounded-full top-2 right-4 cursor-pointer text-red-300 group-hover:block z-10"
                      onClick={() => {
                        deleteSubStoryByIdMutation({
                          variables: { id: substory.id, storyId: storyId },
                          update: (cache) => {
                            deleteUpdate(cache, substory.id);
                          },
                        });
                      }}
                      disabled={deleting}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </React.Fragment>
              ))
            : null}
        </div>

        <MDModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          storyId={storyId}
          initial={editSubStory}
        />
      </div>
    </>
  );
};

export default StoryContent;
