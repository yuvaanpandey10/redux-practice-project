import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useInView } from "motion/react";
import {
  fetchPhotos,
  fetchVideos,
  fetchGifs,
  PER_PAGE,
} from "../api/mediaApi.js";
import {
  searchStart,
  loadMoreStart,
  searchSuccess,
  searchFail,
} from "../redux/features/searchSlice.js";
import useSearchState from "../hooks/useSearchState.js";
import MediaGrid from "./MediaGrid.jsx";
 
const fetchers = {
  photos: async (q, page) => {
    const r = await fetchPhotos(q, page);
    return {
      items: (r?.results || []).map((item) => ({
        id: item.id,
        type: "photo",
        title: item.alt_description,
        thumbnail: item.urls.small,
        src: item.urls.full,
        pageURL: item.links?.html,
      })),
      hasMore: page < (r?.total_pages || 0),
    };
  },
  videos: async (q, page) => {
    const r = await fetchVideos(q, page);
    return {
      items: (r?.hits || []).map((item) => ({
        id: item.id,
        type: "video",
        title: item.name || item.tags,
        thumbnail:
          item.videos?.medium?.thumbnail || item.videos?.small?.thumbnail,
        src: item.videos?.medium?.url || item.videos?.small?.url,
        pageURL: item.pageURL,
      })),
      hasMore: page * PER_PAGE < (r?.totalHits || 0),
    };
  },
  gif: async (q, page) => {
    const list = (await fetchGifs(q, page))?.data;
    const arr = list?.data || [];
    return {
      items: arr.map((item) => ({
        id: item.id,
        type: "gif",
        title: item.title,
        thumbnail: item.file?.sm?.jpg?.url || item.file?.xs?.jpg?.url,
        src: item.file?.md?.gif?.url || item.file?.hd?.gif?.url,
      })),
      hasMore: list?.has_next ?? arr.length >= PER_PAGE,
    };
  },
};
 
const Skeleton = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="relative aspect-4/3 w-full animate-pulse overflow-hidden rounded-2xl bg-gray-600 shadow-md"
      >
        <div className="absolute left-3 top-3 h-6 w-16 rounded-full bg-gray-500" />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-3">
          <div className="h-3 w-3/4 rounded bg-gray-500" />
          <div className="h-3 w-1/2 rounded bg-gray-500" />
        </div>
      </div>
    ))}
  </div>
);
 
const Message = ({ title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex h-64 flex-col items-center justify-center gap-2 text-center"
  >
    <h2 className="text-2xl font-semibold text-white">{title}</h2>
    <p className="max-w-md text-sm text-gray-200">{text}</p>
  </motion.div>
);
 
const ResultGrid = () => {
  const dispatch = useDispatch();
  const { q, type } = useSearchState();
  const { results, page, hasMore, loading, loadingMore, error } = useSelector(
    (s) => s.search,
  );
 
  const sentinel = useRef(null);
  const inView = useInView(sentinel, { margin: "400px" });
 
  // new query or tab -> fresh search
  useEffect(() => {
    if (!q) return;
    let cancelled = false;
    dispatch(searchStart());
    fetchers[type](q, 1)
      .then(({ items, hasMore }) => {
        if (!cancelled)
          dispatch(searchSuccess({ items, hasMore, page: 1, append: false }));
      })
      .catch((err) => {
        if (!cancelled) dispatch(searchFail(err.message));
      });
    return () => {
      cancelled = true;
    };
  }, [dispatch, q, type]);
 
  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    dispatch(loadMoreStart());
    const next = page + 1;
    fetchers[type](q, next)
      .then(({ items, hasMore }) =>
        dispatch(searchSuccess({ items, hasMore, page: next, append: true })),
      )
      .catch((err) => dispatch(searchFail(err.message)));
  };
 
  // infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore && !error) loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, results.length]);
 
  if (!q)
    return (
      <Message
        title="Search something."
        text="Type a keyword above to find photos, videos and GIFs."
      />
    );
 
  if (error) return <Message title="Something went wrong" text={error} />;
 
  if (loading) return <Skeleton />;
 
  if (results.length === 0)
    return (
      <Message
        title="No results"
        text={`Nothing found for "${q}". Try a different keyword.`}
      />
    );
 
  return (
    <>
      <MediaGrid items={results} />
 
      <div ref={sentinel} className="flex justify-center py-10">
        {loadingMore ? (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        ) : hasMore ? (
          <button
            onClick={loadMore}
            className="cursor-pointer rounded-full bg-green-950 px-6 py-2 text-sm font-semibold transition duration-300 hover:bg-green-900 active:scale-95"
          >
            Load more
          </button>
        ) : (
          <p className="text-sm text-gray-300">You've reached the end ✨</p>
        )}
      </div>
    </>
  );
};
 
export default ResultGrid;