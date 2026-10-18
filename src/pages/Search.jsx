import Tabs from "../components/Tabs.jsx";
import ResultGrid from "../components/ResultGrid.jsx";
import useSearchState from "../hooks/useSearchState.js";
import PageWrap from "./PageWrap.jsx";
 
const Search = () => {
  const { q } = useSearchState();
 
  return (
    <PageWrap className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">
          {q ? (
            <>
              Results for <span className="text-green-300">“{q}”</span>
            </>
          ) : (
            "Explore"
          )}
        </h1>
        <Tabs />
      </div>
      <ResultGrid />
    </PageWrap>
  );
};
 
export default Search;