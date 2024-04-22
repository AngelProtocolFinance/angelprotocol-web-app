import React, { useState, useEffect } from "react";
import headillust from "../../../../assets/landing/head-illust.webp";
import Button from "../../../../components/landing/Button";
import Navbar from "../../../../components/landing/Navbar";
import "../../../../styles/landing/hero.css";
const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero  mb-[90px] px-[18px] lg:px-[150px]  w-full h-full  py-[30px] md:px-[50px]   relative">
      <img
        src={headillust}
        className="absolute w-full h-full  lg:top-[-16%]   top-0 left-0 lg:object-fill object-center md:object-cover object-cover "
        alt=""
      />
      <Navbar />
      <div className="copy font-heading">
        <p className="text-[13px] md:text-[18px] z-10">
          Give Today, Give Forever
        </p>
        <h1 className="text-[40px] md:text-[64px]  text-center z-10">
          Simplified Giving,
          <br className="xl:block hidden md:hidden lg:hidden" /> Amplified
          Impact
        </h1>
        <p className="text-base text-[#1D3C51] z-10 font-normal lg:w-full md:w-full w-full hidden lg:block md:block md:text-[24px] text-center md:text-balance lg:leading-normal md:leading-normal font-body">
          As a nonprofit serving nonprofits, our all-in-one fundraising solution
          is free, global, and inclusive. <br /> However you want to give and
          receive, we've got your back. Together we can make donations go
          further and last forever.
        </p>
        <p className="text-base lg:hidden md:hidden text-[#1D3C51] z-10 font-normal  w-[95%]  md:text-[24px] text-center l font-body">
          As a nonprofit serving nonprofits, our all-in-one fundraising solution
          is free, global, and inclusive. <br /> However you want to give and
          receive, we've got your back. Together we can make donations go
          further and last forever.
        </p>

        <div className="z-20  relative">
          <div className=" -ml-3 z-40">
            <Button text={"Join Us"} />
          </div>
          <span className="md:flex flex-col items-center absolute top-[50%] right-[-70%] text-[#183244] hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="82"
              height="45"
              viewBox="0 0 82 45"
              fill="none"
            >
              <path
                d="M78.6531 43.6601C79.0178 44.404 79.9164 44.7114 80.6602 44.3468C81.4041 43.9821 81.7115 43.0835 81.3469 42.3396L78.6531 43.6601ZM0.750315 12.1702C0.292122 12.8603 0.480187 13.7913 1.17037 14.2495L12.4175 21.7161C13.1077 22.1743 14.0387 21.9863 14.4969 21.2961C14.955 20.6059 14.767 19.675 14.0768 19.2168L4.07932 12.5797L10.7164 2.58225C11.1746 1.89207 10.9865 0.961128 10.2963 0.502936C9.60613 0.0447435 8.67518 0.232808 8.21699 0.92299L0.750315 12.1702ZM81.3469 42.3396C75.0449 29.4838 67.7273 19.1122 55.5168 13.3317C43.3394 7.56684 26.583 6.50333 1.70298 11.5295L2.29702 14.4701C26.917 9.49647 42.9106 10.6831 54.2332 16.0432C65.5227 21.3877 72.4551 31.0161 78.6531 43.6601L81.3469 42.3396Z"
                fill="#183244"
              />
            </svg>
            <p className="text-[#183244] translate-x-12 -rotate-[12deg] font-gochi">
              It’s totally free!
            </p>
          </span>
        </div>
      </div>
      <div className="h-[400px] blur-[200px]"></div>
      <div className="h-[380px] w-[140vw] left-[-70px] bottom-[-10%] md:w-[120vw] lg:w-[120vw] lg:h-[140px]  absolute lg:left-[-40px] lg:rounded-full    lg:bottom-[90px] md:bottom-[-120px] md:left-[-60px] bg-[#fff]   lg:blur-[25px]  md:blur-[35px] blur-[40px] "></div>
      <div className="h-[200px] extra_width absolute bottom-[230px] left-[-70px] bg-[#ffff] hidden lg:block md:block  rounded-full blur-[400px] overflow-x-hidden"></div>
    </section>
  );
};

export default Hero;
