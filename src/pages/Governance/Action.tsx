import React from "react";
export default function Action(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { _title: string }
) {
  return (
    <button
      {...props}
      className="font-heading text-sm text-white-grey bg-angel-blue hover:bg-bright-blue w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md disabled:bg-gray-400 disabled:cursor-default"
    >
      {props._title}
    </button>
  );
}
