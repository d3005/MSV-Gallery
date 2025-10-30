import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import PhotoDetail from "@/pages/PhotoDetail";

function PageTransitions() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter page-enter-active">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Navbar />
        <PageTransitions />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
