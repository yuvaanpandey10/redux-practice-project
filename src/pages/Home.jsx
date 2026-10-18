import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import SearchBar from "../components/SearchBar.jsx";
import PageWrap from "./PageWrap.jsx";
import { clearRecent, addRecent } from "../redux/features/searchSlice.js";
 
const trending = ["Nature", "Cyberpunk", "Coffee", "Ocean", "Space", "Cats"];
 
const features = [
  { type: "photos", title: "Photos", desc: "High-resolution images from Unsplash.", glow: "bg-blue-400/10" },
  { type: "videos", title: "Videos", desc: "Free HD clips from Pixabay.", glow: "bg-red-400/10" },
  { type: "gif", title: "GIFs", desc: "Reactions and loops from Klipy.", glow: "bg-green-400/10" },
];
 
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const revealWords = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};
const revealHeading = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
 
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recent = useSelector((s) => s.search.recent);
  const savedItems = useSelector((s) => s.collection.items);
  const saved = savedItems.slice(0, 4);
 
  const go = (term, type = "photos") => {
    dispatch(addRecent(term));
    navigate(`/search?q=${encodeURIComponent(term)}&type=${type}`);
  };
 
  return (
    <PageWrap>
      <section className="relative overflow-hidden bg-linear-to-b from-gray-200 to-gray-400 px-4 py-20 text-center text-gray-900 sm:py-28">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-green-400/40 blur-3xl"
        />
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-6"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl"
          >
            Discover{" "}
            <span className="bg-linear-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              stunning media
            </span>
          </motion.h1>
          <motion.p variants={item} className="max-w-xl text-gray-700">
            Search millions of photos, videos and GIFs in one place. Save your
            favorites to a personal collection.
          </motion.p>
          <motion.div variants={item} className="flex w-full justify-center">
            <SearchBar variant="hero" />
          </motion.div>
 
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2">
            {trending.map((t) => (
              <button
                key={t}
                onClick={() => go(t)}
                className="cursor-pointer rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium transition duration-300 hover:bg-white active:scale-95"
              >
                {t}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>
 
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-8">
        {recent.length > 0 && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent searches</h2>
              <button
                onClick={() => dispatch(clearRecent())}
                className="cursor-pointer text-sm text-gray-300 hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => go(r)}
                  className="cursor-pointer rounded-full bg-white/10 px-4 py-1.5 text-sm transition duration-300 hover:bg-white/20 active:scale-95"
                >
                  🕘 {r}
                </button>
              ))}
            </div>
          </section>
        )}
 
        <section>
          <motion.h2
            variants={revealHeading}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.7 }}
            className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl"
            aria-label="Explore by media type"
          >
            {"Explore by media type".split(" ").map((word, index) => (
              <motion.span
                key={word}
                variants={revealWords}
                className={`mr-2 inline-block ${
                  index === 2 ? "text-gray-300" : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 sm:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.type}
                variants={item}
                whileHover={{ y: -9, scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <Link
                  to={`/search?q=${encodeURIComponent(recent[0] || "nature")}&type=${f.type}`}
                  className="group relative isolate block overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 p-6 shadow-lg shadow-black/20 ring-1 ring-white/10 transition duration-300 hover:ring-white/30"
                >
                  <span
                    className={`pointer-events-none absolute -right-12 -top-16 -z-10 h-44 w-44 rounded-full blur-3xl transition duration-500 group-hover:scale-150 ${f.glow}`}
                  />
                  <h3 className="text-xl font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-gray-300">{f.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-100 transition-transform duration-300 group-hover:translate-x-1">
                    Explore <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
 
        {saved.length > 0 && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">From your collection</h2>
              <Link to="/collection" className="text-sm text-gray-200 hover:text-white">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {saved.map((s) => (
                <Link
                  key={`${s.type}-${s.id}`}
                  to="/collection"
                  className="group aspect-4/3 overflow-hidden rounded-2xl bg-gray-700"
                >
                  <img
                    src={s.thumbnail || s.src}
                    alt={s.title || ""}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageWrap>
  );
};
 
export default Home;