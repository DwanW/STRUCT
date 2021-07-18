import React, { useState, useEffect } from "react";

interface FormTagProps {
  submitMutation: Function;
  value: string;
  label: string;
  className?: string;
  enableEdit?: boolean;
  showTitle?: boolean;
}

const FormTag: React.FC<FormTagProps> = ({
  submitMutation,
  value,
  label,
  className,
  enableEdit = true,
  showTitle = true,
}) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<string>(value);

  useEffect(() => {
    let tagArr = currentTags.split(",");
    if (inputValue[inputValue.length - 1] === ",") {
      // only if there's enough characters and not duplicated, add to the tags
      if (
        inputValue.length >= 3 &&
        tagArr.indexOf(inputValue.replace(",", "")) < 0
      ) {
        setCurrentTags(currentTags + inputValue);
      }
      setInputValue("");
    }
  }, [inputValue]);

  const removeTag = (idx: number) => {
    let newTags = currentTags.split(",");
    newTags.splice(idx, 1);
    setCurrentTags(newTags.join(","));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submitMutation(currentTags);
    setIsEdit(!isEdit);
  };

  if (!isEdit) {
    return (
      <div className={className}>
        <div className="flex flex-row justify-between">
          <h4
            className={`text-left text-lg leading-relaxed text-blue-700 dark:text-blue-200 font-bold ${
              showTitle ? "" : "hidden"
            }`}
          >
            {label}
          </h4>
          <button
            className={`text-green-600 dark:text-white px-1 my-2 rounded-full shadow border hover:border-gray-300 hover:bg-gray-300 dark:border-green-600 dark:hover:bg-green-800 dark:bg-green-600 ${
              enableEdit ? "" : "hidden"
            }`}
            onClick={() => setIsEdit(!isEdit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        </div>
        <div className="text-left dark:text-white">
          {value.split(",").map(
            (tag) =>
              tag && (
                <span
                  key={tag}
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-500 bg-blue-100 mr-3"
                >
                  {tag}
                </span>
              )
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col">
        <h4 className="text-left text-lg leading-relaxed text-blue-700 dark:text-blue-200 font-bold">
          Edit {label}
        </h4>
        <div className="p-4 border border-gray-400 dark:bg-gray-600 dark:text-white">
          {currentTags.split(",").map(
            (tag, idx) =>
              tag && (
                <span
                  key={tag}
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-500 bg-blue-100 mr-3"
                >
                  {tag}{" "}
                  <button
                    onClick={() => removeTag(idx)}
                    className="font-bold text-white bg-gray-500 hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )
          )}
          <input
            className="p-4 focus:outline-none dark:bg-gray-600 dark:text-white"
            placeholder="type new tags"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex">
          <input
            className="bg-green-500 flex text-white flex-initial w-min font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer hover:bg-green-700"
            type="submit"
            value="Submit"
          />
          <input
            className="text-gray-700 bg-gray-300 flex-initial w-min font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer hover:bg-gray-400"
            type="button"
            onClick={() => {
              setIsEdit(!isEdit);
              setInputValue("");
              setCurrentTags(value);
            }}
            value="Cancel"
          />
        </div>
      </div>
    </form>
  );
};

export default FormTag;
