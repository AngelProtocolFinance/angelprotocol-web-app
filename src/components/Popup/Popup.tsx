import React, { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

export type Handler = () => void;

export interface Props {
  message: string;
  //function to run before the Modal and Popup is closed
  acknowledge: Handler;
  //function to run inside Popup e.g share / redirect etc

  //add a child or adjacent children - will make new implicit rows
  //and message box will not shrink
  children?: ReactNode;
}

export default function Popup(props: Props) {
  console.log("renders");

  return (
    <div className="p-4 grid grid-rows-1a place-items-center  bg-white-grey w-full max-w-xs min-h-r15  rounded-xl shadow-lg overflow-hidden relative">
      <button className={`absolute top-3 right-3`} onClick={props.acknowledge}>
        <IoCloseOutline className="text-angel-grey" />
      </button>
      <p className="text-angel-grey my-18">{props.message}</p>
      {props.children}
    </div>
  );
}
