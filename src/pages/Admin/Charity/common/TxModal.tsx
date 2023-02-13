import { Dialog } from "@headlessui/react";
import { FormHTMLAttributes } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { LoadingStatus } from "components/Status";

type Props = FormHTMLAttributes<HTMLFormElement> & {
  isSending: boolean;
  title: string;
  action: string;
};

export default function TxModal({
  isSending,
  children,
  action,
  title,
  ...props
}: Props) {
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      {...props}
      as="form"
      className="max-w-[37.5rem] w-[95vw] sm:w-full fixed-center z-20 bg-white dark:bg-blue-d6 border border-prim rounded"
    >
      <div className="relative border-b border-prim py-5 text-center">
        <span className="font-bold font-heading text-lg">{title}</span>
        <button
          onClick={closeModal}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 border border-prim rounded p-2"
        >
          <Icon type="Close" size={26.5} />
        </button>
      </div>
      {children}
      <div className="mt-8 px-8 py-4 gap-x-3 border-t border-prim flex justify-end">
        <button
          disabled={isSending}
          onClick={closeModal}
          type="button"
          className="text-sm min-w-[8rem] py-2 btn-outline-filled"
        >
          Cancel
        </button>
        <button
          disabled={isSending}
          type="submit"
          className="text-sm min-w-[8rem] py-2 btn-orange"
        >
          {isSending ? <LoadingStatus>Processing...</LoadingStatus> : action}
        </button>
      </div>
    </Dialog.Panel>
  );
}
