import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import s from "./image/Inifnite Half-right.png";
import s2 from "./image/half1.png";
import s3 from "./image/Ellipse 32.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EasePack } from "gsap/EasePack";
import { CustomEase } from "gsap/CustomEase";

const Video = () => {
  // useEffect(() => {
  //     const text = document.querySelector(".text p")
  //     text.innerHTML = text.innerText.split("").map((char, i) => {
  //         return `<span style="transform:rotate(${i * 8.3}deg)">${char}</span>`
  //     }).join("")
  // }, [])

  // const [rotation, setRotation] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Define the GSAP animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".video",
        start: "top top",
        // end: 'top -40%',
        scrub: 1,
        // markers:true
      },
      ease: "none",
      duration: 5,
    });

    tl.to(".circle img:first-child", {
      scrollTrigger: {
        trigger: ".video",
        start: "top top",
        // end: 'top 40%',
        scrub: 1,
        // markers:true,
      },
      ease: "none",
      rotation: 360,
      duration: 2,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    //   const handleScroll = () => {
    //     const newRotation = rotation + 5; // You can adjust the rotation speed here
    //     setRotation(newRotation);
    //   };

    //   window.addEventListener('scroll', handleScroll);

    //   return () => {
    //     window.removeEventListener('scroll', handleScroll);
    //   };
  }, []);

  return (
    <section className=" video py-[29px] px-[15px] md:pt-[120px] lg:p-[100px] md:px-[30px] md:pb-[10px]     flex flex-col gap-5 lg:gap-[40px] relative    xl:m-auto ">
      {/* <div className='h-[250px] md:hidden'></div> */}
      <span className="flex flex-col  w-full    relative">
        {/* <img src="" alt="" /> */}
        <span className="flex items-center justify-center  top-[-100px] md:top-[-250px] top-[-220px]     w-full h-[170px] ">
          <span className="video_bg_blur hidden md:block"></span>
          <img src={s2} alt="" className="md:h-full md:w-[220px] h-28  " />
          <img
            src={s}
            alt=""
            className="md:h-full  md:w-[220px] md:ml-[-96px] lg:ml-[-96px] mt-1 md:mt-1 h-28 ml-[-62px] "
          />
          {/* <img src={s3} style={{mixBlendMode:"revert-layer"}} className=' w-[485px] mt-[100px]  h-24 scale-[1.2]   blur-[15px]  absolute object-cover object-center' alt="" /> */}
          <div className="lg:h-[200px]  lg:w-[445px] md:h-[300px] md:w-[445px] w-[300px] h-[200px] top-14 md:bottom-20  absolute  rounded-full lg:bottom-28 bg-[#fff] blur-[20px]"></div>
        </span>

        <div className="text flex flex-col  items-center -top-[65px]  md:-top-[50px] lg:-top-[50px]   relative">
          <h2 className="text-[#183244] text-[32px] md:text-[42px] font-bold text-center Quicksand md:mb-5 leading-normal mb-5 w-[100%]  md:max-w-[85%] lg:max-w-[85%]">
            The Better.Giving <br className="md:hidden lg:hidden" /> Alliance
          </h2>
          <p className="text-[20px] md:text-[28px] lg:text-[28px] text-[#1D3C51] font-medium lg:min-w-[816px] w-[324px] opacity-[.8] md:w-[692px] md:tracking-[.3px] text-center  m-auto DM_Sans">
            Join a global alliance of partners united around a giving pledge to
            create lasting positive change{" "}
          </p>
        </div>
      </span>

      <div className=" borderLine flex flex-col relative top-0 left-[50%] translate-x-[-50%] items-center  justify-center gap-[40px] md:gap-[48px] lg:p-[32px] md:rounded-[48px] rounded-[18px] lg:rounded-[88px] p-[8px] pb-[24px]  w-full lg:w-[1100px]  bg-white md:mt-2 lg:mt-2 -mt-5 z-10">
        {/* <video src=""></video> */}
        <div className="relative w-full  h-[171.2px] lg:h-[626px]  md:h-[392.94px] shrink-0  rounded-[17.5px] md:rounded-[40.17px] lg:rounded-[64px] overflow-hidden ">
          {/* <img src="/video_banner.png" alt="video" className='h-[150px] lg:min-h-[600px] md:h-[400px]  w-full' /> */}
          <img
            src="/video_bannerUpdate.png"
            alt="video"
            className=" w-full h-full object-fill  object-center"
          />
          {/* <button className='absolute md:top-[50%] md:left-[50%] top-[50%] left-[50%] p-3 bg-[#a3c6de] rounded-full h-[80px] w-[80px] flex items-center justify-center  transform -translate-x-1/2 -translate-y-1/2'>
                        <span className='w-[60px] h-[60px] md:w-[90px] md:h-[90px] bg-[#2D89C8] rounded-full px-5 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        </span>
                    </button> */}
        </div>

        {/* Its image code hai */}

        <span className=" circle absolute    lg:left-[-5%] md:left-[-5px] origin-center md:scale-[.8] lg:scale-[1] lg:bottom-[25%] md:bottom-[-9%] text-[16px] font-bold text-[#2D89C8] w-[180px] h-[180px] rounded-full hidden md:flex lg:flex items-center justify-center Quicksand">
          <img
            src="/heartText.svg"
            className="heartText w-full h-full object-cover object-center"
            alt=""
          />
          {/* <h2  className=' s absolute top-[50%] left-[50%] object-cover object-center translate-x-[-50%] translate-y-[-50%] z-50'>💙</h2> */}
          <img
            src="/heartOFText.png"
            alt=""
            className=" absolute top-[50%] left-[50%] object-cover object-center translate-x-[-50%] translate-y-[-50%] z-50"
          />
        </span>

        {/* <span className='absolute lg:left-[10%] md:left-[100px] md:scale-[.9] lg:bottom-[22%] md:bottom-[-2%] text-[42px] w-[200px] h-[210px] circle hidden md:block lg:block'>
      <img src="/heart.png" alt="heart" className='uppercase text-lg font-bold rotating-text absolute top-[40%] left-[-45%]' style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.2s ease-in-out' }} />
    </span> */}

        <p className="text-[16px] md:text-[24px] font-medium opacity-[.8] text-[#1D3C51] text-center md:w-[698px] w-[304px] md:px-5 lg:w-[908px] DM_Sans">
          We connect you with the causes you care about most, with pioneering
          ways to contribute, grow, and track your generosity, all while
          celebrating our collective impact.
        </p>
        <Button text={"Join the Movement"} className="self-center" />
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="209"
        height="332"
        viewBox="0 0 209 332"
        fill="none"
        className="absolute top-[50%] right-0"
      >
        <path
          opacity="0.4"
          className="hidden md:block lg:block"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.4599 1.46459C58.4961 5.03489 68.6012 20.9313 65.0303 36.9701C41.8195 141.223 107.503 244.549 211.738 267.756C315.973 290.963 419.289 225.263 442.5 121.01C446.07 104.971 461.965 94.8632 478.001 98.4335C494.038 102.004 504.143 117.9 500.572 133.939C470.219 270.269 335.114 356.186 198.807 325.838C62.4991 295.491 -23.3944 160.371 6.95815 24.041C10.529 8.00208 26.4237 -2.1057 42.4599 1.46459Z"
          fill="url(#paint0_linear_509_319)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_509_319"
            x1="505.55"
            y1="111.579"
            x2="-27.334"
            y2="246.616"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D8E7FD" />
            <stop offset="1" stopColor="#E1F0EB" />
          </linearGradient>
        </defs>
      </svg>
    </section>

    //     <section className=' video py-[29px] px-[15px] md:pt-[120px] lg:p-[100px] md:px-[30px] md:pb-[10px]    flex flex-col gap-5 lg:gap-[40px] relative xl:w-[100vw]   xl:m-auto '>
    //         {/* <div className='h-[250px] md:hidden'></div> */}
    //         <span className='flex flex-col  w-full    relative'>
    //             {/* <img src="" alt="" /> */}
    //             <span className='flex items-center justify-center  top-[-100px] md:top-[-250px] top-[-220px]     w-full h-[170px] '>
    //                 <span className='video_bg_blur hidden md:block'></span>
    //                 <img src={s2} alt="" className='md:h-full md:w-[220px] h-28  ' />
    //                <img src={s} alt="" className='md:h-full  md:w-[220px] md:ml-[-96px] lg:ml-[-96px] mt-1 md:mt-1 h-28 ml-[-62px] ' />
    //                {/* <img src={s3} style={{mixBlendMode:"revert-layer"}} className=' w-[485px] mt-[100px]  h-24 scale-[1.2]   blur-[15px]  absolute object-cover object-center' alt="" /> */}
    //                <div className='lg:h-[200px]  lg:w-[445px] md:h-[300px] md:w-[445px] w-[300px] h-[200px] top-14 md:bottom-20  absolute  rounded-full lg:bottom-28 bg-[#fff] blur-[20px]'></div>

    //             </span>

    //          <div className="text flex flex-col  items-center -top-[65px]  md:-top-[50px] lg:-top-[50px]   relative">
    //          <h2 className='text-[#183244] text-[32px] md:text-[42px] font-bold text-center Quicksand md:mb-5 leading-normal mb-5 w-[100%]  md:max-w-[85%] lg:max-w-[85%]'>The Better.Giving <br className='md:hidden lg:hidden' /> Alliance</h2>
    //             <p className='text-[20px] md:text-[28px] lg:text-[28px] text-[#1D3C51] font-medium lg:min-w-[816px] w-[324px] opacity-[.8] md:w-[692px] md:tracking-[.3px] text-center  m-auto DM_Sans'>Joining Better Giving as an alliance offers a powerful avenue for communal social responsibility, with a vast network of 125+ partners dedicated to the giving pledge. </p>
    //          </div>

    //         </span>

    //         <div className='flex flex-col items-center justify-center gap-[40px] md:gap-[48px] lg:p-[32px] md:rounded-[48px] rounded-[18px] lg:rounded-[88px] p-[8px] pb-[24px]  border border-solid bg-white   md:mt-2 lg:mt-2 -mt-5 z-10'>
    //             {/* <video src=""></video> */}
    //             <div className='relative w-full  h-[171.2px] lg:h-[626px]  md:h-[392.94px] shrink-0  rounded-[17.5px] md:rounded-[40.17px] lg:rounded-[64px] overflow-hidden '>
    //                 {/* <img src="/video_banner.png" alt="video" className='h-[150px] lg:min-h-[600px] md:h-[400px]  w-full' /> */}
    //                 <img src="/video_bannerUpdate.png" alt="video" className=' w-full h-full object-fill  object-center' />
    //                 {/* <button className='absolute md:top-[50%] md:left-[50%] top-[50%] left-[50%] p-3 bg-[#a3c6de] rounded-full h-[80px] w-[80px] flex items-center justify-center  transform -translate-x-1/2 -translate-y-1/2'>
    //                     <span className='w-[60px] h-[60px] md:w-[90px] md:h-[90px] bg-[#2D89C8] rounded-full px-5 flex items-center justify-center'>
    //                         <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-12 h-12">
    //                             <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    //                         </svg>
    //                     </span>
    //                 </button> */}

    //             </div>

    //             {/* yh Anurag ka hai */}

    //             <span className=' circle absolute   lg:left-[4%] md:left-[15px] origin-center md:scale-[.8] lg:scale-[1] lg:bottom-[20%] md:bottom-[-5%] text-[16px] font-bold text-[#2D89C8] w-[180px] h-[180px] rounded-full hidden md:flex lg:flex items-center justify-center Quicksand'>
    //            <img src="/heartText.svg" className='heartText w-full h-full object-cover object-center'  alt="" />
    //            <img src="/heartOfText.png" alt="" className=' absolute' />
    //     </span>

    //             {/* <span className='absolute lg:left-[10%] md:left-[100px] md:scale-[.9] lg:bottom-[22%] md:bottom-[-2%] text-[42px] w-[200px] h-[210px] circle hidden md:block lg:block'>
    //   <img src="/heart.png" alt="heart" className='uppercase text-lg font-bold rotating-text absolute top-[40%] left-[-45%]' style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.2s ease-in-out' }} />
    // </span> */}

    //             <p className='text-[16px] md:text-[24px] font-medium opacity-[.8] text-[#1D3C51] text-center md:w-[698px] w-[304px] md:px-5 lg:w-[908px] DM_Sans'>Through strategic connections and shared purpose, the platform magnifies impact, enabling sponsors to support local nonprofit experts, multiply their influence, and drive collective support for causes that truly matter.</p>
    //             <Button text={"Join the Movement"} className="self-center" />
    //         </div>

    //         <svg xmlns="http://www.w3.org/2000/svg" width="209" height="332" viewBox="0 0 209 332" fill="none" className='absolute top-[50%] right-0'>
    //             <path opacity="0.4" className='hidden md:block lg:block' fillRule="evenodd" clipRule="evenodd" d="M42.4599 1.46459C58.4961 5.03489 68.6012 20.9313 65.0303 36.9701C41.8195 141.223 107.503 244.549 211.738 267.756C315.973 290.963 419.289 225.263 442.5 121.01C446.07 104.971 461.965 94.8632 478.001 98.4335C494.038 102.004 504.143 117.9 500.572 133.939C470.219 270.269 335.114 356.186 198.807 325.838C62.4991 295.491 -23.3944 160.371 6.95815 24.041C10.529 8.00208 26.4237 -2.1057 42.4599 1.46459Z" fill="url(#paint0_linear_509_319)" />
    //             <defs>
    //                 <linearGradient id="paint0_linear_509_319" x1="505.55" y1="111.579" x2="-27.334" y2="246.616" gradientUnits="userSpaceOnUse">
    //                     <stop stopColor="#D8E7FD" />
    //                     <stop offset="1" stopColor="#E1F0EB" />
    //                 </linearGradient>
    //             </defs>
    //         </svg>
    //     </section>
  );
};

export default Video;
