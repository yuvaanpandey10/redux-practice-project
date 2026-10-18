import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRecent } from "../redux/features/searchSlice.js";
import useSearchState from "../hooks/useSearchState.js";
 
const SearchBar = ({ variant = "hero" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { q, type } = useSearchState();
  const [text, setText] = useState(variant === "compact" ? q : "");
 
  // keep the compact bar in sync with the URL
  useEffect(() => {
    if (variant === "compact") setText(q);
  }, [q, variant]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    dispatch(addRecent(value));
    navigate(`/search?q=${encodeURIComponent(value)}&type=${type}`);
    if (variant === "hero") setText("");
  };
 
  const hero = variant === "hero";
 
  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full ${hero ? "max-w-2xl" : ""}`}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder={hero ? "Search photos, videos, GIFs..." : "Search anything..."}
        aria-label="Search"
        className={`w-full rounded-full bg-white text-gray-900 placeholder-gray-400 shadow-md outline-none ring-2 ring-transparent transition focus:ring-green-400 ${
          hero ? "py-4 pl-6 pr-32 text-lg" : "py-2 pl-4 pr-24 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`absolute bottom-1 right-1 top-1 cursor-pointer rounded-full bg-linear-to-r from-gray-700 to-black font-medium text-white outline-none transition duration-200 hover:from-gray-600 hover:to-gray-900 active:scale-95 ${
          hero ? "px-7" : "px-4 text-sm"
        }`}
      >
        Search
      </button>
    </form>
  );
};
 
export default SearchBar;
 