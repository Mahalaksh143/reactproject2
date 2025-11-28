import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Favourites from "./Pages/Favourites";


export default function App() {
  return (
        <>
      <Navbar />
       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favourites" element={<Favourites />} />
        <Route path="/meal/:id" element={<Details />} />
        
      </Routes>
    </>
  );
}

  