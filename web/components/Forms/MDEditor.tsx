import { createPopper } from "@popperjs/core";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface MDEditorProps {}

const MDEditor: React.FC<MDEditorProps> = ({}) => {
  const [mdText, setMdText] = useState("");
  const [showLegend, setShowLegend] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

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
    <div className="container mx-auto border border-red-200 min-h-screen">
      <h4 className="text-4xl text-center">My MD Editor</h4>
      <div
        ref={btnRef}
        onClick={() => (showLegend ? closeLegend() : openLegend())}
      >
        legend
      </div>
      <div
        ref={legendRef}
        className={`bg-gray-100 p-2 ${showLegend ? "" : "hidden"}`}
      >
        <table className="border border-black">
          <tr className="border border-black">
            <th className="px-2">Style</th>
            <th className="px-2">Example</th>
          </tr>
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
            <td className="px-2 border-r border-black">italicized text</td>
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
        </table>
      </div>
      <div className="mt-2 mx-2 border border-purple-200">
        <textarea
          className="w-full min-h-[200px]"
          value={mdText}
          onChange={(e) => setMdText(e.target.value)}
        />
        <div className="prose min-h-[200px]">
          <ReactMarkdown
            children={mdText}
            remarkPlugins={[[gfm, { singleTilde: false }]]}
            className="px-3 py-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MDEditor;
