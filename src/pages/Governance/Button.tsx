import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className="font-heading text-sm text-white w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md bg-blue hover:bg-blue-l1 disabled:bg-gray disabled:cursor-default"
    />
  );
}
