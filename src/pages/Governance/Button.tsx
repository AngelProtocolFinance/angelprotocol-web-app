import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className="font-heading text-sm text-white w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md bg-angel-blue hover:bg-bright-blue disabled:bg-gray-400 disabled:cursor-default"
    />
  );
}
