import React, { useEffect, useState } from "react";
import Footer from "../../../components/landing/Footer";
import HeroBottom from "../../../components/landing/HeroBottom";
import NewNavbar from "../../../components/landing/NewNavbar";
import "../App.css";
import Animation from "../sections/Home/Animation";
import Blogs from "../sections/Home/Blogs";
import Brands from "../sections/Home/Brands";
import Hero from "../sections/Home/Hero";
import Path from "../sections/Home/Path";
import Testimonials from "../sections/Home/Testimonials";
import Video from "../sections/Home/Video";
const Home = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const heroHeight = 700;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > heroHeight) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="app">
        <Hero />
        <HeroBottom />
        <Path />
        <Brands />
        <Animation />
        <Video />
        <Testimonials />
        <Blogs />
      </div>
      {showNavbar && <NewNavbar />}
      <Footer />
    </div>
  );
};

export default Home;
