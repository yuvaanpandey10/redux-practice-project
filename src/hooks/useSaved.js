import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleCollection } from "../redux/features/collectionSlice.js";
 
export default function useSaved(item) {
  const dispatch = useDispatch();
  const saved = useSelector((s) =>
    s.collection.items.some((i) => i.id === item.id && i.type === item.type),
  );
 
  const toggle = () => {
    dispatch(
      toggleCollection({
        id: item.id,
        type: item.type,
        title: item.title,
        thumbnail: item.thumbnail,
        src: item.src,
        pageURL: item.pageURL,
      }),
    );
    toast[saved ? "info" : "success"](
      saved ? "Removed from your collection" : "Added to your collection",
    );
  };
 
  return [saved, toggle];
}
 