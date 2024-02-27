import React from "react";
import Navbar2 from "../layout/Navbar2";
import Navbar from "../layout/Navbar";
// import CommunityChat from "./CommunityChat";
import HeroSection from "../layout/HeroSection";
import Footer from "../layout/Footer";
import Cards from "../layout/Cards";
import { Carousel } from "bootstrap";
import CardItem from "../layout/CardItem";
import Gallery from "../layout/Gallery";
export default function Home() {
  return (
    <div>
      <Navbar2 />
      {/* <Navbar /> */}
      <HeroSection />
      <Cards />
      <Gallery />
      {/* <CardItem /> */}
      <Footer />
    </div>
  );
}
