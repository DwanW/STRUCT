import React, { useState } from "react";

interface FormTextAreaProps {
  submitMutation: Function;
  value: string;
  label: string;
  className?: string;
  enableEdit?: boolean;
  showTitle?: boolean;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  submitMutation,
  value,
  label,
  className,
  enableEdit = true,
  showTitle = true,
}) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [inputValue, setInputValue] = useState<any>(value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submitMutation(inputValue);
    setIsEdit(!isEdit);
  };

  if (!isEdit) {
    return (
      <div className={className}>
        <div className="flex flex-row justify-between">
          <h4
            className={`text-left text-lg leading-relaxed text-blue-700 font-bold ${
              showTitle ? "" : "hidden"
            }`}
          >
            {label}
          </h4>
          <button
            className={`text-green-600 px-1 rounded-full shadow border hover:border-gray-300 hover:bg-gray-300 ${
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
        <div className="text-left">{value}</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col">
        <h4 className="text-left text-lg leading-relaxed text-blue-700 font-bold">
          Edit {label}
        </h4>
        <textarea
          className="h-40 p-4 focus:outline-none border border-transparent focus:border-gray-400"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
              setInputValue(value);
            }}
            value="Cancel"
          />
        </div>
      </div>
    </form>
  );
};

export default FormTextArea;
