import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useSaved from "../hooks/useSaved.js";
import { badgeStyles, downloadItem } from "../utils/media.js";
 
const Lightbox = ({ items, index, onClose, onChange }) => {
  const item = items[index];
  const [saved, toggleSave] = useSaved(item);
  const [copied, setCopied] = useState(false);
 
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
 
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onChange(index - 1);
      if (e.key === "ArrowRight" && hasNext) onChange(index + 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, hasPrev, hasNext, onClose, onChange]);
 
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(item.pageURL || item.src);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };
 
  const btn =
    "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition duration-200 active:scale-95";
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
      >
        ✕ Close
      </button>
 
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(index - 1);
          }}
          aria-label="Previous"
          className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 text-xl hover:bg-white/20"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(index + 1);
          }}
          aria-label="Next"
          className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 text-xl hover:bg-white/20"
        >
          ›
        </button>
      )}
 
      <motion.div
        key={`${item.type}-${item.id}`}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-gray-800 shadow-2xl"
      >
        <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.thumbnail}
              controls
              autoPlay
              loop
              className="max-h-[70vh] w-full"
            />
          ) : (
            <img
              src={item.src}
              alt={item.title || ""}
              className="max-h-[70vh] w-full object-contain"
            />
          )}
        </div>
 
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                badgeStyles[item.type]
              }`}
            >
              {item.type}
            </span>
            <p className="mt-2 line-clamp-2 text-sm text-gray-200">
              {item.title || "Untitled"}
            </p>
          </div>
 
          <div className="flex flex-wrap gap-2">
            <button
              onClick={toggleSave}
              className={`${btn} ${
                saved
                  ? "bg-green-950 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-200"
              }`}
            >
              {saved ? "♥ Saved" : "♡ Save"}
            </button>
            <button
              onClick={() => downloadItem(item)}
              className={`${btn} bg-white/10 hover:bg-white/20`}
            >
              Download
            </button>
            <button
              onClick={copyLink}
              className={`${btn} bg-white/10 hover:bg-white/20`}
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
 
export default Lightbox;
 