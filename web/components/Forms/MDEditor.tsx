import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'

interface MDEditorProps {}

const MDEditor: React.FC<MDEditorProps> = ({}) => {
  const [mdText, setMdText] = useState("");

  return (
    <div>
      <h4>My MD Editor</h4>
      <div className="container mx-auto border border-red-200 min-h-screen">
        <div className="mt-2 mx-2 border border-purple-200">
          <textarea
            className="form-textarea w-full min-h"
            value={mdText}
            onChange={(e) => setMdText(e.target.value)}
          />
          <div className="prose">
            <ReactMarkdown children={mdText} remarkPlugins={[[gfm, {singleTilde: false}]]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MDEditor;
