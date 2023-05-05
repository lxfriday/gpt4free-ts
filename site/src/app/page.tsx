"use client";

import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState("");
  function fetchSSE() {
    fetchEventSource("http://localhost:3000/ask/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: text,
      }),
      onmessage(ev) {
        const data = JSON.parse(ev.data)
        if(data.youChatToken) {
          console.log(data.youChatToken);
        }
      },
      onclose() {
        console.log("close");
      },
    });
  }
  useEffect(() => {}, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={fetchSSE}>提交</button>
    </main>
  );
}
