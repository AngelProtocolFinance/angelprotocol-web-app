import React, { useState, useEffect, useRef } from 'react';
import Hero from '../sections/Home/Hero';
import Footer from '../../../components/landing/Footer';
import HeroBottom from '../../../components/landing/HeroBottom';
import Testimonials from '../sections/Home/Testimonials';
import Brands from '../sections/Home/Brands';
import Blogs from '../sections/Home/Blogs';
import Video from '../sections/Home/Video';
import Path from '../sections/Home/Path';
import Animation from '../sections/Home/Animation';
import NewNavbar from '../../../components/landing/NewNavbar';
import "../App.css"
const Home = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const heroHeight = 700; 
  useEffect(() => {
    const handleScroll = () => {
      if ( window.scrollY > heroHeight) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className='app'>
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
}

export default Home;
