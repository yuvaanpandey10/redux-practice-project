import { Link } from "react-router-dom";
import PageWrap from "./PageWrap.jsx";
 
const NotFound = () => (
  <PageWrap className="flex h-96 flex-col items-center justify-center gap-3 text-center">
    <h1 className="text-6xl font-extrabold">404</h1>
    <p className="text-gray-200">This page doesn't exist.</p>
    <Link
      to="/"
      className="rounded-full bg-green-950 px-5 py-2 text-sm font-semibold hover:bg-green-900"
    >
      Back home
    </Link>
  </PageWrap>
);
 
export default NotFound;
 