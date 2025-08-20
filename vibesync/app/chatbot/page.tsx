"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { generateFromGemini } from "../actions/generate";

export default function Chatbot() {
  const [mood, setMood] = useState("");
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChatMoodSubmit = () => {
    setErr("");
    setAnswer("");

    startTransition(async () => {
      try {
        const json = await generateFromGemini(mood || "Testing, who are u?");
        const text =
          json?.candidates?.[0]?.content?.parts?.[0]?.text ??
          JSON.stringify(json, null, 2);
        setAnswer(text);
      } catch (e: any) {
        setErr(e?.message || "Unexpected error");
      }
    });
  };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 bg-white relative flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(120deg, #d5c5ff 0%, #a7f3d0 50%, #f0f0f0 100%)",
        }}
      />
      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        
        <Image
          className="dark:invert"
          src="/vibesync-icon-black.png"
          alt="Vibesync logo"
          width={180}
          height={38}
          priority
        />

        {err && (
            <div className="text-red-600 text-sm w-full break-words">{err}</div>
          )}
          {answer && (
            <pre className="w-full whitespace-pre-wrap rounded-xl bg-white/70 p-4 text-sm">
              {answer}
            </pre>
          )}

        <div className="flex gap-4 items-center flex-col sm:flex-col w-full">
          <Textarea
            placeholder="Whats your mood today?"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />

          <button
            onClick={handleChatMoodSubmit}
            disabled={isPending}
            className="rounded-xl border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="send"
              width={20}
              height={20}
            />
            {isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
