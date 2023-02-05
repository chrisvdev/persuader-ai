import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Response({ response, i }) {
  const [copied, setCopied] = useState(false);
  const copiedEffect = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard onCopy={copiedEffect} text={response}>
      <p
        title="Click this to copy on clipboard!"
        className="flex py-2 px-4 my-1 mx-2 border rounded border-amber-600 hover:border-amber-400 hover:scale-105 hover:bg-indigo-700 active:scale-95 active:border-amber-200 active:bg-indigo-500 sm:text-xl transition-all"
        key={`ai-response_${i}`}
      >
        {!copied ? response : "Copied to the clipboard!"}
      </p>
    </CopyToClipboard>
  );
}


export default Response;
