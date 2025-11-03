"use client";

import { useState } from "react";
import { run } from "./temporal/client";
import Markdown from "react-markdown";

export default function Home() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const start = performance.now();
    setLoading(true);
    const result = await run(input);
    setText(result);
    setLoading(false);
    const end = performance.now();
    console.log(result);
    console.log(`Workflow execution time: ${end - start} ms`);
  }

  return (
    <main className="container mx-auto min-h-screen p-4 flex flex-col items-center">
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Enter input for workflow"
        className="border p-2 mr-2 w-1/2"
      />
      <button
        className="bg-blue-500 text-white p-2"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Loading..." : "Run Workflow"}
      </button>

      <Markdown>{text}</Markdown>
    </main>
  );
}
