import axios from "axios";
 
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const KLIPY_KEY = import.meta.env.VITE_KLIPY_KEY;
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;
 
export const PER_PAGE = 15;
 
export async function fetchPhotos(query, page = 1, per_page = PER_PAGE) {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  return res.data;
}
 
export async function fetchVideos(query, page = 1, per_page = PER_PAGE) {
  const res = await axios.get("https://pixabay.com/api/videos/", {
    params: { key: PIXABAY_KEY, q: query, page, per_page },
  });
  return res.data;
}
 
export async function fetchGifs(query, page = 1, per_page = PER_PAGE) {
  const res = await axios.get(
    `https://api.klipy.com/api/v1/${KLIPY_KEY}/gifs/search`,
    { params: { q: query, page, per_page, customer_id: "user-1" } },
  );
  return res.data;
}