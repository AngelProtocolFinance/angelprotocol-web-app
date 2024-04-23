import { useEffect, useState } from "react";
import Animation from "./Animation";
import "./App.css";
import Path from "./Benefits";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Hero from "./Hero";
import HeroBottom from "./HeroBottom";
import Testimonials from "./Testimonials";
import Video from "./Video";
const Home = () => {
  return (
    <div>
      <div className="bg-gradient-to-b from-white/50 via-[#FBF1EB]/96 to-white overflow-hidden mix-blend-screen">
        <Hero />
        <HeroBottom />
        <Path />
        <Brands />
        <Animation />
        <Video />
        <Testimonials />
        <Blogs />
      </div>
    </div>
  );
};

export default Home;
