import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import s from "../../../../assets/landing/Inifnite Half-right.png";
import s2 from "../../../../assets/landing/half1.png";
import heart from "../../../../assets/landing/heartOfText.png";
import heartText from "../../../../assets/landing/heartText.svg";
import videobanner from "../../../../assets/landing/video_bannerUpdate.png";
import Button from "../../../../components/landing/Button";

const triggerId = "__video";

const Video = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${triggerId}`,
        start: "top top",
        scrub: 1,
      },
      ease: "none",
      duration: 5,
    });

    tl.to(".circle img:first-child", {
      scrollTrigger: {
        trigger: `#${triggerId}`,
        start: "top top",
        scrub: 1,
      },
      ease: "none",
      rotation: 360,
      duration: 2,
    });

    return () => {
      for (const trigger of ScrollTrigger.getAll()) {
        trigger.kill();
      }
    };
  }, []);

  return (
    <section
      id={triggerId}
      className="py-[29px] px-[15px] md:pt-[120px] lg:p-[100px] md:px-[30px] md:pb-2.5 flex flex-col gap-5 lg:gap-[40px] relative xl:m-auto"
    >
      <span className="flex flex-col w-full relative">
        <span className="flex items-center justify-center md:top-[-250px] top-[-220px] w-full h-[170px] ">
          <span className="absolute w-full h-3/6 left-0 bottom-0 hidden md:block"></span>
          <img src={s2} alt="" className="md:h-full md:w-[220px] h-28  " />
          <img
            src={s}
            alt=""
            className="md:h-full  md:w-[220px] md:-ml-24 mt-1 md:mt-1 h-28 ml-[-62px] "
          />
          <div className="lg:h-[200px]  lg:w-[445px] md:h-[300px] md:w-[445px] w-[300px] h-[200px] top-14 md:bottom-20  absolute  rounded-full lg:bottom-28 bg-[#fff] blur-[20px]"></div>
        </span>

        <div className="text flex flex-col  items-center -top-[65px]  md:-top-[50px] lg:-top-[50px]   relative">
          <h2 className="text-navy-d4 text-[32px] md:text-[42px] font-bold text-center font-heading md:mb-5 leading-normal mb-5 w-[100%]  md:max-w-[85%] lg:max-w-[85%]">
            The Better.Giving <br className="md:hidden lg:hidden" /> Alliance
          </h2>
          <p className="text-[20px] md:text-[28px] lg:text-[28px] text-navy-l1 font-medium lg:min-w-[816px] w-[324px] opacity-[.8] md:w-[692px] md:tracking-[.3px] text-center  m-auto font-body">
            Join a global alliance of partners united around a giving pledge to
            create lasting positive change{" "}
          </p>
        </div>
      </span>

      <div className=" borderLine flex flex-col relative top-0 left-[50%] translate-x-[-50%] items-center  justify-center gap-[40px] md:gap-[48px] lg:p-[32px] md:rounded-[48px] rounded-[18px] lg:rounded-[88px] p-2 pb-6 w-full lg:w-[1100px]  bg-white md:mt-2 lg:mt-2 -mt-5 z-10">
        <div className="relative w-full  h-[171.2px] lg:h-[626px]  md:h-[392.94px] shrink-0  rounded-[17.5px] md:rounded-[40.17px] lg:rounded-[64px] overflow-hidden ">
          <img
            src={videobanner}
            alt="video"
            className=" w-full h-full object-fill  object-center"
          />
        </div>

        <span className=" circle absolute lg:left-[-5%] md:left-[-5px] origin-center md:scale-[.8] lg:scale-[1] lg:bottom-[25%] md:bottom-[-9%] font-bold text-blue-d1 w-44 h-44 rounded-full hidden md:flex lg:flex items-center justify-center font-heading">
          <img
            src={heartText}
            className="heartText w-full h-full object-cover object-center"
            alt=""
          />
          <img
            src={heart}
            alt=""
            className=" absolute top-[50%] left-[50%] object-cover object-center translate-x-[-50%] translate-y-[-50%] z-50"
          />
        </span>

        <p className="md:text-[24px] font-medium opacity-[.8] text-navy-l1 text-center md:w-[698px] w-[304px] md:px-5 lg:w-[908px] font-body">
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
  );
};

export default Video;
