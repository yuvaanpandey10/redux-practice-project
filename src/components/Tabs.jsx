import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useSearchState from "../hooks/useSearchState.js";
 
const tabs = [
  { key: "photos", label: "Photos" },
  { key: "videos", label: "Videos" },
  { key: "gif", label: "GIFs" },
];
 
const Tabs = () => {
  const { q, type } = useSearchState();
 
  return (
    <div className="flex flex-wrap gap-2 rounded-full bg-black/20 p-1.5">
      {tabs.map((tab) => {
        const active = type === tab.key;
        return (
          <Link
            key={tab.key}
            to={`/search?q=${encodeURIComponent(q)}&type=${tab.key}`}
            className="relative rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide"
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-green-950 shadow-lg"
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                active ? "text-white" : "text-gray-200 hover:text-white"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
 
export default Tabs;
 