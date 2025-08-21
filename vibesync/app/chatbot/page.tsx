"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { generateFromGemini } from "../actions/generate";
import { SendHorizontal } from 'lucide-react';

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import Navbar from "@/components/navbar";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import error from "next/error";

const choosemood = [
  {
    value: "bahagia",
    label: "Bahagia",
  },
  {
    value: "excited",
    label: "Excited",
  },
  {
    value: "galau",
    label: "Galau",
  },
  {
    value: "marah",
    label: "Sedih",
  },
  {
    value: "kesal",
    label: "Kesal",
  },
  {
    value: "takut",
    label: "Takut",
  },
  {
    value: "kaget",
    label: "Kaget",
  }
]

const choosesong = [
  {
    value: "Romantis",
    label: "Romantis",
  },
  {
    value: "Santai",
    label: "Santai",
  },
  {
    value: "Semangat",
    label: "Semangat",
  },
  {
    value: "Konsentrasi",
    label: "Konsentrasi",
  },
  {
    value: "Party",
    label: "Party",
  },
  {
    value: "Nostalgia",
    label: "Nostalgia",
  },
  {
    value: "Misterius",
    label: "Misterius",
  },
  {
    value: "Melankolis",
    label: "Melankolis",
  },
  {
    value: "Enerjik",
    label: "Enerjik",
  },
  {
    value: "Meditasi",
    label: "Meditasi",
  },
  {
    value: "Adrenaline",
    label: "Adrenaline",
  },
  {
    value: "Relaksasi",
    label: "Relaksasi",
  },
]

function extractYouTubeId(url: string): string | null {
    try {
      const u = new URL(url);
      if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
      if (u.hostname.includes("youtube.com")) {
        if (u.searchParams.get("v")) return u.searchParams.get("v");
        if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] || null;
        if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || null;
      }
      return null;
    } catch {
      return null;
    }
}

export default function Chatbot() {
  const [mood, setMood] = useState("");
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  const [openMood, setOpenMood] = React.useState(false)
  const [valueMood, setValueMood] = React.useState("")

  const [openSongcategory, setOpenSongcategory] = React.useState(false)
  const [valueSongcategory, setValueSongcategory] = React.useState("")

  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const videoId = youtubeLink ? extractYouTubeId(youtubeLink) : null;

  const handleChatMoodSubmit = () => {
    setErr("");
    setAnswer("");
    setYoutubeLink("");

    startTransition(() => {
      generateFromGemini({
        choosemood: valueMood,           // dari dropdown Mood
        message: mood,                   // dari textarea
        songCategory: valueSongcategory, // dari dropdown Category (opsional)
      })
        .then((json) => {
          console.log("Raw API Response:", json);

          const text =
            json?.candidates?.[0]?.content?.parts?.[0]?.text ??
            JSON.stringify(json, null, 2);

          // Ambil URL YouTube dari response API
          const urlMatch = text.match(/https?:\/\/[^\s)]+/);
          const link = urlMatch?.[0] || "";
          setYoutubeLink(link);

          setAnswer(text);
        })
        .catch((e: unknown) => {
          if (e instanceof Error) {
            setErr(e.message);
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
            src="/vibesync-icon-black.png"
            alt="Vibesync logo"
            width={180}
            height={38}
            priority
          />

          <div className="flex gap-4 items-center flex-col sm:flex-col w-full">
            <Popover open={openMood} onOpenChange={setOpenMood}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openMood}
                  className={cn("w-full justify-between", !valueMood && "text-gray-400")}
                >
                  {valueMood
                    ? choosemood.find((m) => m.value === valueMood)?.label
                    : "Select Mood..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search Mood..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No mood found.</CommandEmpty>
                    <CommandGroup>
                      {choosemood.map((m) => (
                        <CommandItem
                          key={m.value}
                          value={m.value}
                          onSelect={(currentValue) => {
                            setValueMood(currentValue === valueMood ? "" : currentValue);
                            setOpenMood(false);
                          }}
                        >
                          {m.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              valueMood === m.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Song Category Selector (opsional) */}
          <div className="flex gap-4 items-center flex-col sm:flex-col w-full -mt-4">
            <Popover open={openSongcategory} onOpenChange={setOpenSongcategory}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSongcategory}
                  className={cn(
                    "w-full justify-between",
                    !valueSongcategory && "text-gray-400"
                  )}
                >
                  {valueSongcategory
                    ? choosesong.find((s) => s.value === valueSongcategory)?.label
                    : "Select Category..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search Category..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {choosesong.map((s) => (
                        <CommandItem
                          key={s.value}
                          value={s.value}
                          onSelect={(currentValue) => {
                            setValueSongcategory(
                              currentValue === valueSongcategory ? "" : currentValue
                            );
                            setOpenSongcategory(false);
                          }}
                        >
                          {s.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              valueSongcategory === s.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {err && <div className="text-red-600 text-sm w-full break-words">{err}</div>}

          {answer && (
            <div className="w-full rounded-xl bg-white/70 p-4 text-sm space-y-3">
              <div className="mb-2">
                {videoId ? (
                  <div className="flex flex-col">

                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full aspect-video rounded-xl"
                      />
                    </div>

                    <div className="flex flex-row pt-4 bb-4 gap-2">
                      <p>
                        Share to :
                      </p>

                      <button
                        onClick={() => alert("Share to Instagram")}
                        className="flex items-center"
                      >
                        <img
                          src="/instagram-icon.svg"
                          alt="Instagram"
                          className="w-5 h-5"
                        />

                      </button>
                    </div>
                    
                  </div>
                  
                ) : (
                  <span className="text-gray-500">Tidak ada link YouTube ditemukan</span>
                )}
              </div>
              <pre className="whitespace-pre-wrap">{answer}</pre>
            </div>
          )}

          <div className="flex gap-4 items-center flex-col sm:flex-col w-full">
            <Textarea
              className="bg-white"
              placeholder="Tell me your day..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />

            <button
              onClick={handleChatMoodSubmit}
              disabled={isPending}
              className="rounded-xl border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              {isPending ? "Sending..." : "Send"}
              <SendHorizontal />
            </button>
          </div>
      </div>
    </div>
  );
}
