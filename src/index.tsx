import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SpinningTrophy from "./components/SpinningTrophy/SpinningTrophy";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <>
    <SpinningTrophy />
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="view/:id" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
