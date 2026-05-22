"use client";

import { useState, useRef, useEffect } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // load chat from storage
  useEffect(() => {
    const saved = localStorage.getItem("chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // save chat to storage
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);

    const prompt = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const fullText = data.text || "No response";

      setMessages((prev) => [...prev, { role: "ai", text: "" }]);

      let i = 0;
      let current = "";

      const interval = setInterval(() => {
        current += fullText[i];
        i++;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "ai",
            text: current,
          };
          return updated;
        });

        if (i >= fullText.length) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 10);
    } catch (err) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error getting response" },
      ]);
    }
  }

  function clearChat() {
    setMessages([]);
    localStorage.removeItem("chat");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full max-w-3xl p-4 text-center">
        <h1 className="text-4xl font-bold">⚡ AI Assistant</h1>
        <p className="text-gray-400 text-sm mt-1">
          Ask anything, get instant answers
        </p>

        <button
          onClick={clearChat}
          className="text-xs text-gray-400 hover:text-white mt-2"
        >
          Clear chat
        </button>
      </div>

      {/* CHAT */}
      <div className="flex-1 w-full max-w-3xl px-4 overflow-y-auto">
        <div className="space-y-3">

          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl max-w-[80%] shadow ${
                m.role === "user"
                  ? "bg-white text-black ml-auto"
                  : "bg-zinc-800 border border-zinc-700 mr-auto"
              }`}
            >
              {m.text}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-2">AI is typing</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="w-full max-w-3xl p-4">
        <div className="flex gap-2 bg-zinc-900 border border-zinc-700 rounded-2xl p-2">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-transparent outline-none px-3"
          />

          <button
            onClick={sendMessage}
            className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:scale-105 transition"
          >
            Send
          </button>

        </div>
      </div>

    </div>
  );
}