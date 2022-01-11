import React from "react";

type Props = {
  bg: string;
  icon: string;
  title: string;
  fund_id: number;
};

export function Banner({ bg, icon, title, fund_id }: Props) {
  return (
    <div
      className={`${bg} flex-1 order-1 col-start-1 col-span-1 self-stretch grid grid-cols-a1 items-center rounded-xl shadow-md`}
    >
      <img src={icon} alt="" className="h-44 m-9" />
      <h1 className="text-5xl text-white uppercase font-bold ">
        <div className="mb-2">{`UNSDG#${fund_id}`}</div>
        <div>{title}</div>
      </h1>
    </div>
  );
}
