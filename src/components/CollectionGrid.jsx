import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { clearCollection } from "../redux/features/collectionSlice.js";
import MediaGrid from "./MediaGrid.jsx";
 
const filters = [
  { key: "all", label: "All" },
  { key: "photo", label: "Photos" },
  { key: "video", label: "Videos" },
  { key: "gif", label: "GIFs" },
];
 
const CollectionGrid = () => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.collection.items);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [text, setText] = useState("");
 
  const counts = useMemo(
    () => ({
      all: items.length,
      photo: items.filter((i) => i.type === "photo").length,
      video: items.filter((i) => i.type === "video").length,
      gif: items.filter((i) => i.type === "gif").length,
    }),
    [items],
  );
 
  const visible = useMemo(() => {
    let list = filter === "all" ? items : items.filter((i) => i.type === filter);
    const t = text.trim().toLowerCase();
    if (t) list = list.filter((i) => (i.title || "").toLowerCase().includes(t));
    return sort === "oldest" ? [...list].reverse() : list;
  }, [items, filter, sort, text]);
 
  const handleClear = () => {
    if (window.confirm("Remove everything from your collection?")) {
      dispatch(clearCollection());
      setFilter("all");
      toast.success("Collection cleared");
    }
  };
 
  if (items.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3 px-4 text-center">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gray-200"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-semibold">Your collection is empty</h2>
        <p className="max-w-sm text-sm text-gray-200">
          Search for something, then press <b>Save</b> on any photo, video or
          GIF to add it here.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-full bg-green-950 px-5 py-2 text-sm font-semibold transition duration-300 hover:bg-green-900 active:scale-95"
        >
          Start searching
        </Link>
      </div>
    );
  }
 
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Collection</h1>
          <p className="text-sm text-gray-200">
            {items.length} saved {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <button
          onClick={handleClear}
          className="cursor-pointer rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold transition duration-300 hover:bg-red-500/80 active:scale-95"
        >
          Clear all
        </button>
      </div>
 
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition duration-300 active:scale-95 ${
                filter === f.key
                  ? "bg-green-950 text-white shadow-lg"
                  : "bg-gray-300 text-black hover:bg-gray-200"
              }`}
            >
              {f.label} <span className="opacity-60">{counts[f.key]}</span>
            </button>
          ))}
        </div>
 
        <div className="ml-auto flex flex-wrap gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Filter by title..."
            className="rounded-full bg-white px-4 py-1.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-green-400"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer rounded-full bg-gray-300 px-4 py-1.5 text-sm font-semibold text-black outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
 
      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-200">
          Nothing matches your filters.
        </p>
      ) : (
        <MediaGrid items={visible} />
      )}
    </section>
  );
};
 
export default CollectionGrid;