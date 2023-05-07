import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Index from "./components";
import Navbar from "./components/child/navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
