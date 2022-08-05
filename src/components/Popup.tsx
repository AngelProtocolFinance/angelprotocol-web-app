import { PropsWithChildren } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";

type Props = PropsWithChildren<{ message: string }>;

export default function Popup(props: Props) {
  const { closeModal } = useModalContext();
  const { children, message } = props;

  return (
    <div className="fixed-center z-10 p-4 grid grid-rows-1a place-items-center  bg-white-grey w-full max-w-xs min-h-115  rounded-xl shadow-lg overflow-hidden">
      <button className="absolute top-3 right-3" onClick={closeModal}>
        <Icon type="Close" className="text-angel-grey" />
      </button>
      <p className="text-angel-grey text-center my-18">{message}</p>
      {children}
    </div>
  );
}
