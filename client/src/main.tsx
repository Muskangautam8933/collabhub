// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./_routes";
import { onError } from "./components/error.page";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider router={router} onError={onError} />,
  // </StrictMode>,
);
