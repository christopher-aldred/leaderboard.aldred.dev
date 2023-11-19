import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import checkAndInitDB from "./utils/checkAndInitDB";

checkAndInitDB();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LeaderBoard />} />
          <Route path="new" element={<h1>Coming soon...</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
