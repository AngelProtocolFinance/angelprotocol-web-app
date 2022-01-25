import { useModalCloser } from "components/Modal/Modal";
import { useFormikContext } from "formik";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { useSetStatus } from "./Donator";
import { Steps } from "./types";

export type Handler = () => void;
export interface Props {
  message?: string;
  children?: ReactNode;
}

export default function Popup(props: Props) {
  //This Popup is inside Modal
  const closeModal = useModalCloser();
  //This Popup is inside Formik
  const { resetForm } = useFormikContext();
  //This Popup is inside Donator
  const setStatus = useSetStatus();

  //default reset when user press 'x' button
  function closePopup() {
    resetForm();
    closeModal();
    setStatus({ step: Steps.initial });
  }

  return (
    <div className="p-6 grid grid-rows-1a place-items-center  bg-white-grey w-full max-w-xs min-h-115  rounded-xl shadow-lg overflow-hidden relative">
      <button className="absolute top-3 right-3" onClick={closePopup}>
        <IoClose className="text-angel-grey" />
      </button>
      <p className="my-6 text-angel-grey text-center font-semibold font-heading">
        {props?.message}
      </p>
      {props.children}
    </div>
  );
}
