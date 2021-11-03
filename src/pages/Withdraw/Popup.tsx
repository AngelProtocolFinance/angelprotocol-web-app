import { IoClose } from "react-icons/io5";
import { PopupProps } from "./types";

export default function Popup(props: PopupProps) {
  return (
    <div className="p-3 md:p-6 bg-white-grey w-full max-w-xs rounded-xl shadow-lg overflow-hidden relative">
      <button className={`absolute top-3 right-3`} onClick={props.onCloseModal}>
        <IoClose className="text-angel-grey" />
      </button>
      <h3 className="my-5 text-lg text-angel-grey text-center items-center font-semibold font-heading">
        {props?.message}
      </h3>
      {props.children}
    </div>
  );
}
