import { useEffect, useState } from "react";
import Animation from "./Animation";
import Path from "./Benefits";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Footer from "./Footer";
import Hero from "./Hero";
import HeroBottom from "./HeroBottom";
import NewNavbar from "./NewNavbar";
import Testimonials from "./Testimonials";
import Video from "./Video";
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
      {showNavbar && <NewNavbar />}
      <Footer />
    </div>
  );
};

export default Home;
