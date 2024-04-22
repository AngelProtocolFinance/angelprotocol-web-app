import React from "react";
const StepsCard = ({ step }) => {
  return (
    <div className="steps_card flex     flex-col md:flex-row gap-5 md:gap-12 justify-between items-center z-[399] pb-[68px]">
      <div className="md:w-[299px] md:h-[299px] w-52 h-52 relative rounded-full bg-white overflow-hidden shadow-lg shadow-slate-200">
        <img
          src={step.img_src}
          alt="step1"
          className="h-full w-full object-cover object-center "
        />
      </div>
      <span className="md:w-1/2 w-full">
        <h4 className="text-navy-d4 text-center md:text-left text-2xl md:text-[32px] leading-[40px] font-bold font-heading">
          {step.title}
        </h4>
        <p className="md:text-[20px] text-center md:text-left opacity-[1] text-navy-l1 w-full font-normal md:text-balance mt-4">
          {step.description}
        </p>
      </span>
    </div>
  );
};

export default StepsCard;
