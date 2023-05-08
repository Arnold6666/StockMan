import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Index from "./components";
import Chatgpt from "./components/gpt";
import Navbar from "./components/child/navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chatgpt />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
