import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/hero.css";
import Button from "../../components/Button";

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
        src="/head-illust.webp"
        className="absolute w-full h-full  lg:top-[-16%]   top-0 left-0 lg:object-fill object-center md:object-cover object-cover "
        alt=""
      />
      <Navbar />
      <div className="copy">
        <p className="vag text-[13px] md:text-[18px] z-10">
          Give Today, Give Forever
        </p>
        <h1 className="text-[40px] md:text-[64px]  text-center z-10">
        Simplified Giving,
          <br className="xl:block hidden md:hidden lg:hidden" /> Amplified Impact
        </h1>
        <p className="text-base text-[#1D3C51] z-10 font-normal lg:w-full md:w-full w-full hidden lg:block md:block md:text-[24px] text-center md:text-balance lg:leading-normal md:leading-normal DM_Sans">
        As a nonprofit serving nonprofits, our all-in-one fundraising solution is free, global, and inclusive. <br /> However you want to give
and receive, we've got your back. Together we can make donations go further and last forever.
        </p>
        <p className="text-base lg:hidden md:hidden text-[#1D3C51] z-10 font-normal  w-[95%]  md:text-[24px] text-center l DM_Sans">
        As a nonprofit serving nonprofits, our all-in-one fundraising solution is free, global, and inclusive. <br /> However you want to give
and receive, we've got your back. Together we can make donations go further and last forever.
        </p>
        {/* <button className='z-20 vag relative'><span>Join Us -</span> It's free</button> */}
        
        <div className="z-20 vag relative">
        <div className=" -ml-3 z-40"><Button text={"Join Us"} /></div>
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
            <p className="text-[#183244] translate-x-12 -rotate-[12deg] Gochi_Hand">
              It’s totally free!
            </p>
          </span>
        </div>
      </div>
      <div className="h-[400px] blur-[200px]"></div>
      <div className="h-[380px] w-[140vw] left-[-70px] bottom-[-10%] md:w-[120vw] lg:w-[120vw] lg:h-[140px]  absolute lg:left-[-40px] lg:rounded-full    lg:bottom-[90px] md:bottom-[-120px] md:left-[-60px] bg-[#fff]   lg:blur-[25px]  md:blur-[35px] blur-[40px] "></div>
      {/* <div className='h-[250px] extra_width absolute bottom-[-20px] left-[-70px] bg-white rounded-full blur-[30px] overflow-x-hidden'></div> */}
      {/* <div className='h-[200px] w-[70%] absolute bottom-[-20px] right-[-70px] bg-white rounded-full blur-[30px]'></div> */}
      <div className="h-[200px] extra_width absolute bottom-[230px] left-[-70px] bg-[#ffff] hidden lg:block md:block  rounded-full blur-[400px] overflow-x-hidden"></div>
      {/* <div className='h-[200px] w-[30%] absolute bottom-[180px] right-[-70px] bg-white rounded-full blur-[100px]'></div> */}
    </section>

    //     <section className='hero  px-[18px] lg:px-[130px] py-[30px] md:px-[20px]   relative'>
    //     <img src="/bg2update.png" className=' absolute w-full h-full  lg:top-[-15%]  top-0 left-0 object-cover object-center' alt="" />
    //   <Navbar />
    //   <div className='copy'>
    //     <p className='vag text-[13px] md:text-[18px] z-10'>Give Today, Give Forever</p>
    //     <h1 className='lg:w-8/12 md:w-[86%] text-[40px] md:text-[64px] md:text-balance z-10'>Make your donations go further & last forever</h1>
    //     <p className='text-base opacity-60 font-normal lg:w-8/12 md:w-[90%] w-full  md:text-[24px] text-center md:text-balance lg:leading-normal md:leading-normal DM_Sans'>Accepting donations, support every giver, and offering services for free to charities all over the world.</p>
    //     <button className='z-20 vag relative'><span>Join Us -</span> It's free
    //       {/* <span className='md:flex flex-col items-center absolute top-[50%] right-[-70%] text-[#183244] hidden'>
    //         <svg xmlns="http://www.w3.org/2000/svg" width="82" height="45" viewBox="0 0 82 45" fill="none">
    //           <path d="M78.6531 43.6601C79.0178 44.404 79.9164 44.7114 80.6602 44.3468C81.4041 43.9821 81.7115 43.0835 81.3469 42.3396L78.6531 43.6601ZM0.750315 12.1702C0.292122 12.8603 0.480187 13.7913 1.17037 14.2495L12.4175 21.7161C13.1077 22.1743 14.0387 21.9863 14.4969 21.2961C14.955 20.6059 14.767 19.675 14.0768 19.2168L4.07932 12.5797L10.7164 2.58225C11.1746 1.89207 10.9865 0.961128 10.2963 0.502936C9.60613 0.0447435 8.67518 0.232808 8.21699 0.92299L0.750315 12.1702ZM81.3469 42.3396C75.0449 29.4838 67.7273 19.1122 55.5168 13.3317C43.3394 7.56684 26.583 6.50333 1.70298 11.5295L2.29702 14.4701C26.917 9.49647 42.9106 10.6831 54.2332 16.0432C65.5227 21.3877 72.4551 31.0161 78.6531 43.6601L81.3469 42.3396Z" fill="#183244" />
    //         </svg>
    //         <p className='text-[#183244] translate-x-12 -rotate-[12deg] Gochi_Hand'>

    //           It’s totally free!
    //         </p>
    //       </span> */}
    //     </button>
    //   </div>
    //   <div className='h-[400px]'></div>
    //   <div className='h-[380px] w-[140%] left-[-70px] bottom-[-6%] md:w-[115%] lg:w-[130%] lg:h-[220px] absolute lg:left-[-100px] lg:rounded-full md:rounded-full lg:bottom-[-10px] md:bottom-[-80px] md:left-[-50px]  bg-[#fff] lg:blur-[15px] md:blur-[15px] blur-[70px] '></div>
    //   {/* <div className='h-[250px] extra_width absolute bottom-[-20px] left-[-70px] bg-white rounded-full blur-[30px] overflow-x-hidden'></div> */}
    //   {/* <div className='h-[200px] w-[70%] absolute bottom-[-20px] right-[-70px] bg-white rounded-full blur-[30px]'></div> */}
    //   <div className='h-[200px] extra_width absolute bottom-[230px] left-[-70px] bg-[#fff] hidden lg:block md:block  rounded-full blur-[120px] overflow-x-hidden'></div>
    //   {/* <div className='h-[200px] w-[30%] absolute bottom-[180px] right-[-70px] bg-white rounded-full blur-[100px]'></div> */}
    // </section>

    //     <section className='hero  px-[18px] lg:px-[130px] py-[30px] md:px-[20px]   relative'>

    //   <Navbar />
    //   <div className='copy'>
    //     <p className='vag text-[13px] md:text-[18px]'>Give Today, Give Forever</p>
    //     <h1 className='lg:w-8/12 md:w-[86%] text-[40px] md:text-[64px] md:text-balance'>Make your donations go further & last forever</h1>
    //     <p className='text-base opacity-60 font-normal lg:w-8/12 md:w-[90%] w-full  md:text-[24px] text-center md:text-balance lg:leading-normal md:leading-normal DM_Sans'>Accepting donations, support every giver, and offering services for free to charities all over the world.</p>
    //     <button className='z-20 vag relative'><span>Join Us -</span> It's free
    //       {/* <span className='md:flex flex-col items-center absolute top-[50%] right-[-70%] text-[#183244] hidden'>
    //         <svg xmlns="http://www.w3.org/2000/svg" width="82" height="45" viewBox="0 0 82 45" fill="none">
    //           <path d="M78.6531 43.6601C79.0178 44.404 79.9164 44.7114 80.6602 44.3468C81.4041 43.9821 81.7115 43.0835 81.3469 42.3396L78.6531 43.6601ZM0.750315 12.1702C0.292122 12.8603 0.480187 13.7913 1.17037 14.2495L12.4175 21.7161C13.1077 22.1743 14.0387 21.9863 14.4969 21.2961C14.955 20.6059 14.767 19.675 14.0768 19.2168L4.07932 12.5797L10.7164 2.58225C11.1746 1.89207 10.9865 0.961128 10.2963 0.502936C9.60613 0.0447435 8.67518 0.232808 8.21699 0.92299L0.750315 12.1702ZM81.3469 42.3396C75.0449 29.4838 67.7273 19.1122 55.5168 13.3317C43.3394 7.56684 26.583 6.50333 1.70298 11.5295L2.29702 14.4701C26.917 9.49647 42.9106 10.6831 54.2332 16.0432C65.5227 21.3877 72.4551 31.0161 78.6531 43.6601L81.3469 42.3396Z" fill="#183244" />
    //         </svg>
    //         <p className='text-[#183244] translate-x-12 -rotate-[12deg] Gochi_Hand'>

    //           It’s totally free!
    //         </p>
    //       </span> */}
    //     </button>
    //   </div>
    //   <div className='h-[400px]'></div>
    //   <div className='h-[380px] w-[140%] left-[-70px] bottom-[-6%] md:w-[115%] lg:w-[130%] lg:h-[220px] absolute lg:left-[-100px] lg:rounded-full md:rounded-full lg:bottom-[-10px] md:bottom-[-80px] md:left-[-50px]  bg-[#fff] blur-[15px] '></div>
    //   {/* <div className='h-[250px] extra_width absolute bottom-[-20px] left-[-70px] bg-white rounded-full blur-[30px] overflow-x-hidden'></div> */}
    //   {/* <div className='h-[200px] w-[70%] absolute bottom-[-20px] right-[-70px] bg-white rounded-full blur-[30px]'></div> */}
    //   <div className='h-[200px] extra_width absolute bottom-[230px] left-[-70px] bg-[#fff] hidden lg:block md:block  rounded-full blur-[120px] overflow-x-hidden'></div>
    //   {/* <div className='h-[200px] w-[30%] absolute bottom-[180px] right-[-70px] bg-white rounded-full blur-[100px]'></div> */}
    // </section>

    // <section className='hero px-[18px] lg:px-[130px] py-[30px] md:px-[20px]   relative'>
    //   <Navbar />
    //   <div className='copy'>
    //     <p className='vag text-[13px] md:text-[18px]'>Give Today, Give Forever</p>
    //     <h1 className='lg:w-8/12 md:w-[86%] text-[40px] md:text-[64px] md:text-balance'>Make your donations go further & last forever</h1>
    //     <p className='text-base opacity-60 font-normal lg:w-8/12 md:w-[90%] w-full  md:text-[24px] text-center md:text-balance lg:leading-normal md:leading-normal DM_Sans'>Accepting donations, support every giver, and offering services for free to charities all over the world.</p>
    //     <button className='z-20 vag relative'><span>Join Us -</span> It's free
    //       {/* <span className='md:flex flex-col items-center absolute top-[50%] right-[-70%] text-[#183244] hidden'>
    //         <svg xmlns="http://www.w3.org/2000/svg" width="82" height="45" viewBox="0 0 82 45" fill="none">
    //           <path d="M78.6531 43.6601C79.0178 44.404 79.9164 44.7114 80.6602 44.3468C81.4041 43.9821 81.7115 43.0835 81.3469 42.3396L78.6531 43.6601ZM0.750315 12.1702C0.292122 12.8603 0.480187 13.7913 1.17037 14.2495L12.4175 21.7161C13.1077 22.1743 14.0387 21.9863 14.4969 21.2961C14.955 20.6059 14.767 19.675 14.0768 19.2168L4.07932 12.5797L10.7164 2.58225C11.1746 1.89207 10.9865 0.961128 10.2963 0.502936C9.60613 0.0447435 8.67518 0.232808 8.21699 0.92299L0.750315 12.1702ZM81.3469 42.3396C75.0449 29.4838 67.7273 19.1122 55.5168 13.3317C43.3394 7.56684 26.583 6.50333 1.70298 11.5295L2.29702 14.4701C26.917 9.49647 42.9106 10.6831 54.2332 16.0432C65.5227 21.3877 72.4551 31.0161 78.6531 43.6601L81.3469 42.3396Z" fill="#183244" />
    //         </svg>
    //         <p className='text-[#183244] translate-x-12 -rotate-[12deg] Gochi_Hand'>

    //           It’s totally free!
    //         </p>
    //       </span> */}
    //     </button>
    //   </div>
    //   <div className='h-[400px]'></div>
    //   <div className='h-[250px] w-[130%] md:w-[115%] lg:w-[130%] absolute lg:left-[-50px] rounded-full lg:bottom-[-80px] md:bottom-[-80px] md:left-[-50px]  left-[-30px] bottom-[-75px] bg-white  blur-[30px]'></div>
    //   {/* <div className='h-[250px] extra_width absolute bottom-[-20px] left-[-70px] bg-white rounded-full blur-[30px] overflow-x-hidden'></div> */}
    //   {/* <div className='h-[200px] w-[70%] absolute bottom-[-20px] right-[-70px] bg-white rounded-full blur-[30px]'></div> */}
    //   <div className='h-[200px] extra_width absolute bottom-[230px] left-[-70px] bg-white hidden lg:block md:block  rounded-full blur-[100px] overflow-x-hidden'></div>
    //   {/* <div className='h-[200px] w-[30%] absolute bottom-[180px] right-[-70px] bg-white rounded-full blur-[100px]'></div> */}
    // </section>
  );
};

export default Hero;
