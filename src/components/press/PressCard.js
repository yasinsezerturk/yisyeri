import React from "react";
import { Play } from "lucide-react";

const PressCard = ({ name, image, poster, onClick, className = "" }) => (
  <button
    type="button"
    aria-label={`${name} videosunu izle`}
    className={`group flex h-full w-full flex-col overflow-hidden rounded-lg bg-white text-left shadow-md transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 ${className}`}
    onClick={onClick}
  >
    <span className="relative block aspect-video w-full overflow-hidden bg-gray-900">
      {(poster || image) && (
        <img
          src={poster || image}
          alt=""
          loading="lazy"
          decoding="async"
          width="640"
          height="360"
          className="h-full w-full object-cover"
        />
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30" aria-hidden="true">
        <span className="rounded-full bg-white/95 p-4 text-blue-700 shadow-lg"><Play size={28} fill="currentColor" /></span>
      </span>
    </span>
    <span className="block p-4 font-semibold text-gray-800">{name}</span>
  </button>
);

export default PressCard;
