import { PropsWithChildren } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Modal from "./Modal";

type Props = PropsWithChildren<{ message: string }>;

export default function Popup(props: Props) {
  const { closeModal } = useModalContext();
  const { children, message } = props;

  return (
    <Modal className="fixed-center z-10 p-4 grid grid-rows-[1fr_auto] place-items-center  bg-white w-full max-w-xs min-h-[15rem]  rounded-xl shadow-lg overflow-hidden">
      <button className="absolute top-3 right-3" onClick={closeModal}>
        <Icon type="Close" className="text-gray-d2" />
      </button>
      <p className="text-gray-d2 text-center my-18">{message}</p>
      {children}
    </Modal>
  );
}
