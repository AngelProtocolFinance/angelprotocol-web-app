import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { BtnPrimary } from "./donation";

type Props = PropsWithChildren<{
  headline: string;
  title: string;
  message: string;
}>;

export default function SuccessPopup(props: Props) {
  const { closeModal } = useModalContext();
  const { children, headline, title, message } = props;

  return (
    <Dialog.Panel className="fixed-center z-10 flex flex-col bg-white w-full max-w-lg overflow-hidden">
      <div className="relative mb-6">
        <h2 className="text-xl text-gray-d2 font-bold text-center border-b-[1px] bg-orange-l6 border-gray-l2 p-5">
          {headline}
        </h2>
        <button
          onClick={() => closeModal()}
          className="absolute right-4 top-3 border border-gray-l2 p-2 rounded-md"
        >
          <Icon type="Close" size={24}></Icon>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 pb-8">
        <Icon
          type="CheckCircle"
          size={96}
          className="text-green opacity-75"
        ></Icon>
        <h2 className="text-xl text-gray-d2 font-bold">{title}</h2>
        <p className="text-center text-gray-d2 opacity-75 mt-[-1rem]">
          {message}
        </p>
      </div>
      <div>{children}</div>
      <div className="w-full text-end bg-orange-l6 border-t-[1px] border-gray-l2 p-3">
        <BtnPrimary
          type="button"
          className="px-10 uppercase"
          onClick={() => closeModal()}
        >
          Done
        </BtnPrimary>
      </div>
    </Dialog.Panel>
  );
}
