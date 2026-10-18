import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          newestOnTop
          theme="dark"
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
 