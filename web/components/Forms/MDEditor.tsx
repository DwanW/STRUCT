import { createPopper } from "@popperjs/core";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface MDEditorProps {
  mdText: string;
  setMdText: Function;
  titleText: string;
  setTitleText: Function;
}

const MDEditor: React.FC<MDEditorProps> = ({
  mdText,
  setMdText,
  titleText,
  setTitleText,
}) => {
  const [showLegend, setShowLegend] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const [isEdit, setIsEdit] = useState(true);

  const openLegend = () => {
    if (btnRef.current && legendRef.current) {
      createPopper(btnRef.current, legendRef.current, {
        placement: "bottom-end",
      });
    }
    setShowLegend(true);
  };

  const closeLegend = () => {
    setShowLegend(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-end">
        <div className="text-gray-600 pr-4">
          <button onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="text-gray-600 pr-4">
          <button
            ref={btnRef}
            onClick={() => (showLegend ? closeLegend() : openLegend())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            ref={legendRef}
            className={`bg-gray-100 p-2 ${showLegend ? "" : "hidden"}`}
          >
            <table className="border border-black">
              <thead>
                <tr className="border border-black">
                  <th className="px-2">Style</th>
                  <th className="px-2">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 border-r border-black">Large Header</td>
                  <td className="px-2"># text</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">medium Header</td>
                  <td className="px-2">## text</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">small Header</td>
                  <td className="px-2">### text</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">bold text</td>
                  <td className="px-2">**text**</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">
                    italicized text
                  </td>
                  <td className="px-2">*text*</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">blockquote</td>
                  <td className="px-2">{">"} text</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">numbered list</td>
                  <td className="px-2">1. text</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">dotted list</td>
                  <td className="px-2">- text</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">link</td>
                  <td className="px-2">[link text](url)</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">code</td>
                  <td className="px-2">```code```</td>
                </tr>
                <tr>
                  <td className="px-2 border-r border-black">strike through</td>
                  <td className="px-2">~~text~~</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-2 mx-2">
        <h4 className="text-left text-lg leading-relaxed text-blue-700 font-bold">
          Title
        </h4>
        <input
          type="text"
          className="w-full mb-4"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
        />
        {isEdit ? (
          <textarea
            className="w-full h-[450px] overflow-y-scroll resize-none"
            value={mdText}
            onChange={(e) => setMdText(e.target.value)}
          />
        ) : (
          <div className="prose h-[450px] overflow-y-scroll">
            <ReactMarkdown
              children={mdText}
              remarkPlugins={[[gfm, { singleTilde: false }]]}
              className="px-3 py-2 w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MDEditor;
