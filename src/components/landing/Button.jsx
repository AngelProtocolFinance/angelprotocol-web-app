import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Button = (props) => {
  return (
    <button className="px-8 py-3.5  bg-[#2D89C8] text-white rounded-[40px] font-semibold text-base flex items-center  gap-1 font-heading self-center">
      {props.text}
      <FaArrowRightLong size={20} className=" ml-1" />
    </button>
  );
};

export default Button;
