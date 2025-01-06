import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./components/router.tsx";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
