import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Index from "./components";
import Chatgpt from './components/chatGpt';
import Navbar from "./components/child/navbar";
import Footer from './components/child/footer';

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat" element={<Chatgpt />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
