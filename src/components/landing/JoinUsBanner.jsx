import React from "react";
import ban from "../../assets/landing/banner_image.png";
const JoinUsBanner = () => {
  return (
    <div className="bg-[#c0d1dd] rounded-[32px] flex flex-col md:flex-row md:items-center lg:px-[64px]  md:px-[50px] md:py-[70px] p-[36px] mt-[180px] bg-no-repeat bg-contain bg-center relative lg:w-[70%] w-[95%] m-auto overflow-hidden xl:max-w-[1140px] xl:m-auto  ">
      <img
        src={ban}
        alt="banner"
        className="absolute right-[-30%] md:right-[10%] top-[-10%] h-full"
      />
      <div className="w-[95%] h-[86%] bg-[#2d89c8] absolute md:rounded-[32px] rounded-[32px] left-[2.5%]  top-[7%] opacity-70 "></div>
      <span className="z-10 font-heading mb-[48px]">
        <p className="text-lg font-bold mb-1 uppercase text-white">
          Fueling Dreams
        </p>
        <p className="text-[24px] md:text-[42px] font-bold  lg:max-w-1/2 md:max-w-[80%] text-white">
          Together, we can change the world for good
        </p>
      </span>
      <button className=" font-[font-heading] z-10 px-[80px] py-[18px] bg-white whitespace-nowrap rounded-[40px] font-semibold md:font-bold text-2xl md:text-3xl text-[#2D8AC8] flex justify-center">
        Join Us{" "}
        <span className="md:hidden font-medium text-xl md:text-2xl mt-[2px] md:mt-1">
          - It's free
        </span>
      </button>
    </div>
  );
};

export default JoinUsBanner;
