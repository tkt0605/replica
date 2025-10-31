import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/Router";
import "./styles/index.css"; // ✅ Tailwind のスタイルを読み込む

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
