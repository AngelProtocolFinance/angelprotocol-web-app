import { cleanup } from "@testing-library/react";
import { useModalCloser } from "components/Modal/Modal";
import React, { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

export type Handler = () => void;

export interface Props {
  message?: string;
  children?: ReactNode;
  //run before closing popup
  cleanup?: () => void;
}

export default function Popup(props: Props) {
  console.log(cleanup);
  //Popup must only be rendered inside Modal
  const closeModal = useModalCloser();
  function closePopup() {
    if (cleanup !== undefined) {
      cleanup();
    }
    closeModal();
  }
  //To use formik context, make sure Popup is also inside <Formik/> tree

  return (
    <div className="p-4 grid grid-rows-1a place-items-center  bg-white-grey w-full max-w-xs min-h-r15  rounded-xl shadow-lg overflow-hidden relative">
      <button className={`absolute top-3 right-3`} onClick={closePopup}>
        <IoCloseOutline className="text-angel-grey" />
      </button>
      <p className="text-angel-grey text-center my-18">{props?.message}</p>
      {props.children}
    </div>
  );
}
