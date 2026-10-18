import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import ResultCard from "./ResultCard.jsx";
import Lightbox from "./Lightbox.jsx";
 
// Shared grid + lightbox used by search results and the collection
const MediaGrid = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const close = useCallback(() => setOpenIndex(null), []);
 
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <ResultCard
              key={`${item.type}-${item.id}`}
              item={item}
              index={i}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </AnimatePresence>
      </div>
 
      <AnimatePresence>
        {openIndex !== null && items[openIndex] && (
          <Lightbox
            items={items}
            index={openIndex}
            onClose={close}
            onChange={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
};
 
export default MediaGrid;
 