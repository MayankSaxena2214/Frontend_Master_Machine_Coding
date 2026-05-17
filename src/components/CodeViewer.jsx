"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeViewer = ({
  code = "",
  language = "javascript",
  showLineNumbers = true,
}) => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-700">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "16px",
          fontSize: "14px",
          background: "#0f172a",
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;