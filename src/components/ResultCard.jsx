import { useRef } from "react";
import { motion } from "motion/react";
import useSaved from "../hooks/useSaved.js";
import { badgeStyles, downloadItem } from "../utils/media.js";
 
const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);
 
const ResultCard = ({ item, index = 0, onOpen }) => {
  const [saved, toggleSave] = useSaved(item);
  const videoRef = useRef(null);
 
  const stop = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };
 
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="group relative aspect-4/3 w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-700 shadow-md ring-1 ring-white/5 hover:shadow-2xl"
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.thumbnail}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={item.type === "photo" ? item.thumbnail : item.src}
          alt={item.title || ""}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
 
      <span
        className={`pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur ${
          badgeStyles[item.type] || "bg-gray-800/80"
        }`}
      >
        {item.type}
      </span>
 
      <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={stop(toggleSave)}
          aria-label={saved ? "Remove from collection" : "Save to collection"}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur transition duration-200 ${
            saved
              ? "bg-green-950 text-white shadow-lg"
              : "bg-white/90 text-gray-900 hover:bg-white"
          }`}
        >
          <motion.span
            key={String(saved)}
            initial={{ scale: saved ? 0.4 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <HeartIcon filled={saved} />
          </motion.span>
          {saved ? "Saved" : "Save"}
        </motion.button>
 
        <button
          onClick={stop(() => downloadItem(item))}
          className="cursor-pointer rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur transition duration-300 hover:bg-black/80 sm:opacity-0 sm:group-hover:opacity-100"
        >
          Download
        </button>
      </div>
 
      {item.title && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-3 pt-10 opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          <p className="line-clamp-2 text-sm font-medium text-white">
            {item.title}
          </p>
        </div>
      )}
    </motion.div>
  );
};
 
export default ResultCard;