"use client"

import Image from "next/image";
import Link from "next/link";

import LogoLoop from '@/components/reactbits/logoloops';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const imageLogos = [
  { src: "nextjs-icon.svg", alt: "Company 3", href: "https://company3.com" },
  { src: "supabase-icon.svg", alt: "Company 3", href: "https://company3.com" },
  { src: "tailwind-icon.svg", alt: "Company 3", href: "https://company3.com" },
  { src: "typescript-icon.svg", alt: "Company 3", href: "https://company3.com" },
  { src: "vercel-icon.svg", alt: "Company 3", href: "https://company3.com" },
];

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-white relative flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #d5c5ff 0%, #a7f3d0 50%, #f0f0f0 100%)"
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

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/chatbot"
          >
            Chatbot
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/chatbot"
          >
            Read our docs
          </Link>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Product Information</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Shipping Details</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days, while express shipping
                ensures delivery within 1-2 business days.
              </p>
              <p>
                All orders are carefully packaged and fully insured. Track your
                shipment in real-time through our dedicated tracking portal.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We stand behind our products with a comprehensive 30-day return
                policy. If you&apos;re not completely satisfied, simply return the
                item in its original condition.
              </p>
              <p>
                Our hassle-free return process includes free return shipping and
                full refunds processed within 48 hours of receiving the returned
                item.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
      <LogoLoop
            className="pt-6"
            logos={imageLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="transparent"
            ariaLabel="Technology partners"
          />
    </div>
  );
}