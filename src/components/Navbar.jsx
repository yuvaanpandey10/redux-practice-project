import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import SearchBar from "./SearchBar.jsx";
 
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
 
const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-1.5 text-sm font-semibold transition duration-300 ${
    isActive ? "bg-white/15 text-white" : "text-gray-300 hover:text-white"
  }`;
 
const Navbar = () => {
  const count = useSelector((s) => s.collection.items.length);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
 
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-white/10 bg-gray-900/80 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight">
          yyyyyyyy
        </Link>
 
        {!isHome && (
          <div className="order-last w-full md:order-0 md:ml-6 md:w-auto md:max-w-md md:flex-1">
            <SearchBar variant="compact" />
          </div>
        )}
 
        <nav className="ml-auto flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            Explore
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition duration-300 ${
                isActive
                  ? "bg-green-950 text-white shadow-lg"
                  : "bg-gray-300 text-black hover:bg-gray-200"
              }`
            }
          >
            <HeartIcon filled={count > 0} />
            <span className="hidden sm:inline">Collection</span>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 1.6 }}
                animate={{ scale: 1 }}
                className="rounded-full bg-green-950 px-2 py-0.5 text-xs font-bold text-white"
              >
                {count}
              </motion.span>
            )}
          </NavLink>
        </nav>
      </div>
    </motion.header>
  );
};
 
export default Navbar;