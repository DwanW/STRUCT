import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import MDEditor from "../Forms/MDEditor";
import {
  GetSubStoriesFromStoryIdDocument,
  useCreateSubStoryMutation,
} from "../../generated/graphql";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  storyId: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, storyId }) => {
  const cancelButtonRef = useRef(null);
  const [mdText, setMdText] = useState("");
  const [titleText, setTitleText] = useState("");

  const [createSubStoryMutation] = useCreateSubStoryMutation({
    update: (cache, { data }) => {
      try {
        const subStories: any = cache.readQuery({
          query: GetSubStoriesFromStoryIdDocument,
          variables: { storyId: storyId },
        });

        cache.writeQuery({
          query: GetSubStoriesFromStoryIdDocument,
          variables: { storyId: storyId },
          data: {
            getSubStoriesFromStoryId: [
              ...subStories.getSubStoriesFromStoryId,
              data?.createSubStory.substory,
            ],
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleCreateSubSection = async () => {
    if (mdText && titleText) {
      await createSubStoryMutation({
        variables: {
          storyId,
          storyInput: { text: mdText, title: titleText },
        },
      });

      setIsOpen(false);
      setMdText("");
      setTitleText("");
    } else {
      return;
    }
  };

  const handleDiscard = () => {
    setIsOpen(!isOpen);
    setMdText("");
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        // open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block container mx-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-600 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="#e0e0e0"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left flex-1">
                    <Dialog.Title className="text-lg leading-6 font-medium text-gray-900">
                      Add a New Sub-Section
                    </Dialog.Title>
                    <div className="mt-2">
                      <MDEditor
                        mdText={mdText}
                        setMdText={setMdText}
                        titleText={titleText}
                        setTitleText={setTitleText}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCreateSubSection}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDiscard}
                  ref={cancelButtonRef}
                >
                  Discard
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
