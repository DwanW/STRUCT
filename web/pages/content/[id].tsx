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
    // const data = cache.readQuery<GetSubStoriesFromStoryIdQuery>({
    //   query: GetSubStoriesFromStoryIdDocument,
    //   variables: {
    //     storyId: storyId,
    //   },
    // });
    // const newData = {
    //   getSubStoriesFromStoryId: data?.getSubStoriesFromStoryId.filter(
    //     (sub) => sub.id !== substoryId
    //   ),
    // };
    // cache.writeQuery({
    //   query: GetSubStoriesFromStoryIdDocument,
    //   variables: {
    //     storyId: storyId,
    //   },
    //   data: newData,
    // });
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
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green-500 w-3/4 text-white text-center font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none my-4 ease-linear transition-all duration-150"
          >
            Add Sub-Section
          </button>
          {data?.getSubStoriesFromStoryId
            ? data.getSubStoriesFromStoryId.map((substory, idx) => (
                <React.Fragment key={`subtitle${idx}`}>
                  <div
                    className="px-4 py-2 w-full text-lg font-bold hover:shadow cursor-pointer hover:bg-gray-200"
                    onClick={() => scrollToSubStory(substory.id)}
                  >
                    {substory.title}
                  </div>
                  <button
                    className="w-14 bg-gray-300"
                    onClick={() => {
                      setEditSubStory(substory);
                      setIsOpen(!open);
                    }}
                  >
                    update
                  </button>
                  <button
                    className="w-14 bg-gray-300"
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
                    delete
                  </button>
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
