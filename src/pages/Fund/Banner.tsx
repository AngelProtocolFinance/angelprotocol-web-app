import React from "react";

type Props = {
  className: string;
  icon: string;
  title: string;
  fund_id: number;
};

export default function Banner({ className, icon, title, fund_id }: Props) {
  return (
    <div
      className={`${className} flex flex-col sm:flex-row items-center rounded-xl shadow-md`}
    >
      <img
        src={icon}
        alt=""
        className="h-24 md:h-44 lg:h-24 xl:h-44 m-4 md:m-9"
      />
      <h1 className="text-3xl md:text-5xl lg:text-3xl xl:text-5xl text-white uppercase font-bold ">
        <div className="mb-2">{`UNSDG#${fund_id}`}</div>
        <div>{title}</div>
      </h1>
    </div>
  );
}
