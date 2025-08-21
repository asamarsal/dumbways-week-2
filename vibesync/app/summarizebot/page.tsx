"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { summarizeFromGemini } from "../actions/summarize";
import { SendHorizontal } from 'lucide-react';

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import Navbar from "@/components/navbar";

function cleanSummary(text: string): string {
  // Hilangkan **teks** di seluruh baris
  let cleaned = text.replace(/\*\*(.*?)\*\*/g, "$1");
  // Ganti baris yang diawali * menjadi -
  cleaned = cleaned.replace(/^\s*\*\s+/gm, "- ");
  return cleaned;
}

export default function Summarybot() {
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");
    const [err, setErr] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSummarize = () => {
            setErr("");
            setAnswer("");
            startTransition(() => {
            summarizeFromGemini({ text: input })
                .then((json) => {
                // Log response dari API
                console.log("Raw API Response:", json);

                const text =
                    json?.candidates?.[0]?.content?.parts?.[0]?.text ??
                    JSON.stringify(json, null, 2);

                setAnswer(cleanSummary(text));
                })
                .catch((error: unknown) => {
                if (error instanceof Error) {
                    setErr(error.message);
                } else {
                    setErr("Unexpected error occurred");
                }
                });
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

            <Navbar/>

            <Image
                className="dark:invert"
                src="/summarybot-icon-black.png"
                alt="Summarybot logo"
                width={220}
                height={48}
                priority
            />

            <div className="flex gap-4 items-center flex-col sm:flex-col w-full">
                <Textarea
                    className="bg-white"
                    placeholder="Input long text to summarize..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    onClick={handleSummarize}
                    disabled={isPending}
                    className="rounded-xl border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                >
                {isPending ? "Sending..." : "Send"}

                <SendHorizontal />

                </button>
            </div>

            {err && (
                <div className="text-red-500 text-sm mt-2">{err}</div>
            )}

            {answer && (
                <div className="w-full mt-6 bg-gray-100 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap">{answer}</pre>
                </div>
            )}
        </div>
    </div>
    );
}
