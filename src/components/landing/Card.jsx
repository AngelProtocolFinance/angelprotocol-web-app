import { appRoutes } from "constants/routes";
import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="flex flex-col gap-8 w-[90%] max-h-[520px] md:w-full md:max-h-[520px] lg:max-h-[520px] bg-white pb-4 rounded-[20px] z-10 overflow-hidden shadow-[0px_12px_6px_0px_rgba(80,79,79,0.06)]">
      <span className="relative">
        <img src={props.img_src} alt="nonprofit logo" className="w-full h-60" />
        <img
          src={props.logo}
          alt="logo"
          className="absolute object-cover h-[px] w-10 bottom-5 right-8"
        />
      </span>

      <h4 className="text-[#0D283A] font-bold text-xl px-8 whitespace-nowrap text-ellipsis">
        {props.name}
      </h4>
      <p className="text-[#0D283A] h-12 text-base px-8 opacity-80 overflow-hidden text-ellipsis line-clamp-2 -mt-4">
        {props.work}
      </p>
      <span className="px-8 justify-center flex items-center gap-8">
        <Link
          to={`${appRoutes.marketplace}/${props.id}`}
          className="rounded-[40px] py-2 px-7 border-2 border-solid border-blue-d1 text-blue-d1 font-semibold font-heading"
        >
          Donate
        </Link>
      </span>
    </div>
  );
};

export default Card;
