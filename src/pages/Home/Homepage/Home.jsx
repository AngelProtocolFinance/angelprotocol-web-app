import React, { useState, useEffect, useRef } from 'react';
import Hero from '../sections/Home/Hero';
import Footer from '../components/Footer';
import HeroBottom from '../components/HeroBottom';
import Testimonials from '../sections/Home/Testimonials';
import Brands from '../sections/Home/Brands';
import Blogs from '../sections/Home/Blogs';
import Video from '../sections/Home/Video';
import Path from '../sections/Home/Path';
import JoinUsBanner from '../components/JoinUsBanner';
import Animation from '../sections/Home/Animation';
import NewNavbar from '../components/NewNavbar';
import { useAdminContext } from 'pages/Admin/Context';
import { idParamToNum } from "helpers";
import { useEndowment } from 'services/aws/useEndowment';
import "../App.css"
import useCards from 'pages/Marketplace/Cards/useCards';
const Home = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  // const {
  //   hasMore,
  //   isLoading,
  //   isFetching,
  //   isLoadingNextPage,
  //   loadNextPage,
  //   data,
  //   isError,
  // } = useCards();
  // console.log(data);
  const heroHeight = 700; // Height of Hero section
  // const numId = idParamToNum(id);
  // const endowmentQuery = useEndowment({ id: numId }, { skip: !id });
  // console.log(numId);
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
        {/* <Benefits /> */}
        <Path />
        <Brands />
        <Animation />
        {/* <JoinUsBanner /> */}
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
