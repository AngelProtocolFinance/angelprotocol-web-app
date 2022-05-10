import { PropsWithChildren } from "react";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Icon from "components/Icons/Icons";

export default function Popup(props: PropsWithChildren<{ message: string }>) {
  const { closeModal } = useModalContext();
  return (
    <div className="fixed-center z-10 p-4 grid grid-rows-1a place-items-center  bg-white-grey w-full max-w-xs min-h-115  rounded-xl shadow-lg overflow-hidden">
      <button className="absolute top-3 right-3" onClick={closeModal}>
        <Icon type="Close" className="text-angel-grey" />
      </button>
      <p className="text-angel-grey text-center my-18">{props.message}</p>
      {props.children}
    </div>
  );
}
