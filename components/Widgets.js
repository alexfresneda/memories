import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from "./News";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Widgets({ mediaLink }) {
  return (
    <div className=" ml-8 hidden space-y-5 lg:inline ">
      <iframe
        className="sticky top-8 my-4 rounded-4xl"
        // src="https://open.spotify.com/embed/episode/7v5fMjsRX8HdxCuWMsddqr/video?utm_source=generator"
        src={mediaLink}
        width="240"
        height="352"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
