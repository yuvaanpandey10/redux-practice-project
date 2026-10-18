import { useSearchParams } from "react-router-dom";
 
export const TYPES = ["photos", "videos", "gif"];
 
export default function useSearchState() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const raw = params.get("type");
  const type = TYPES.includes(raw) ? raw : "photos";
  return { q, type };
}
 