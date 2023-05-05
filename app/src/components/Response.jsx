import React, { useState } from "react";

function Response({ response, i }) {
  const [copyStatus, setCopyStatus] = useState({
    copied: false,
    achievedCopy: false,
  });
  const copiedEffect = (success) => {
    setCopyStatus({ copied: true, achievedCopy: success });
    setTimeout(() => {
      setCopyStatus((state) => {
        return { ...state, copied: false };
      });
    }, 2000);
  };

  const copier = () => {
    navigator.clipboard
      .writeText(response)
      .then(() => {
        copiedEffect(true);
      })
      .catch(() => {
        copiedEffect(false);
      });
  };

  return (
    <p
      onClick={copier}
      title="Click this to copy on clipboard!"
      className="flex justify-center items-center text-center py-2 px-4 my-1 mx-2 border rounded border-amber-600 hover:border-amber-400 hover:scale-105 hover:bg-indigo-700 active:scale-95 active:border-amber-200 active:bg-indigo-500 sm:text-xl transition-all"
      key={`ai-response_${i}`}
    >
      {!copyStatus.copied
        ? response
        : copyStatus.achievedCopy
        ? "Copied to the clipboard!"
        : "Error copying to the clipboard 😭"}
    </p>
  );
}

export default Response;
