import React, { useEffect, useState } from "react";
import "../../styles/landing/carousel.css";

const Carousel = ({ slides }) => {
  const [, setright] = useState(0);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(slides.length - 1);
  }, [slides]);

  useEffect(() => {
    setright(-(active - 2) * 50);
  }, [active]);

  return (
    <div className="flex flex-col gap-5 font-body lg:hidden">
      {slides.map((slide, index) => {
        return (
          <div
            className={`flex flex-col items-center gap-5 pt-5 px-[15px] md:px-[85px] w-full h-[480px] rounded-[56px] blur-[0px] shadow-black/5 ${
              index === 0
                ? "bg-[#EDFCE2]"
                : index === 1
                  ? "bg-[#EAE2FC]"
                  : "bg-[#FCF6E2]"
            }`}
            key={index}
          >
            <img src={slide.img_src} alt="logo" className="w-56 h-56" />
            <p className="text-[20px] text-center md:text-[28px] font-body text-black font-bold">
              {slide.title}
            </p>
            <p className="md:text-xl text-center">{slide.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
