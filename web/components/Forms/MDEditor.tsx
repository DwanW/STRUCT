import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface MDEditorProps {}

const MDEditor: React.FC<MDEditorProps> = ({}) => {
  const [mdText, setMdText] = useState("");

  return (
    <div className="container mx-auto border border-red-200 min-h-screen">
      <h4 className="text-4xl text-center">My MD Editor</h4>
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
