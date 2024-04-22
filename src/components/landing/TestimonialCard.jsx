import React from "react";
import CRUDButtons from "./CRUDButtons";

const TestimonialCard = (props) => {
  return (
    <div
      className={`relative md:w-full md:min-h-[450px] lg:w-full lg:min-h-[450px] w-full min-h-[430px] p-3 pt-16 borderLine rounded-3xl flex flex-col justify-between bg-white font-body overflow ${props.className}`}
    >
      {props.role === "ADMIN" && (
        <CRUDButtons handleDelete={props.handleDelete} id={props.id} />
      )}
      <div className=" w-[130px] h-[130px] absolute top-[-10%] left-[20px] ">
        <img
          src={props.reviewer_logo}
          alt="logo"
          className="w-full h-full object-contain "
        />
      </div>
      <p className="lg:text-[18px] md:text-[18px] text-[17px] h-[270px] mt-8 text-ellipsis overflow-x-hidden font-normal w-full break-words  opacity-[.8]">
        {props.review ||
          "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level."}
      </p>
      <span className="h-[84px]">
        <p className="text-lg opacity-90 font-bold">{props.reviewer}</p>
        <p className="md:text-lg font-medium opacity-75">
          {props.reviewer_profession}
        </p>
      </span>
    </div>
  );
};

export default TestimonialCard;
