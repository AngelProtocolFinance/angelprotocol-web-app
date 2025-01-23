import { Link, useNavigate } from "@remix-run/react";
import { X } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Modal } from "../Modal";
import { PromptIcon } from "./prompt-icon";
export interface Props extends PropsWithChildren {
  type?: "success" | "error" | "loading";
  open?: boolean;
  onClose?: () => void;
  isDismissable?: boolean;
}

export function PromptV2({
  type,
  children,
  onClose,
  open,
  isDismissable = true,
}: Props) {
  const navigate = useNavigate();
  function close() {
    if (!isDismissable) return;
    if (onClose) return onClose();
    navigate("..", { preventScrollReset: true, replace: true });
  }
  return (
    <Modal
      open={open ?? true}
      onClose={close}
      classes="fixed-center z-10 grid text-navy-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <div className="flex justify-end p-4 border-b border-gray-l4">
        <button
          type="button"
          onClick={close}
          className="border border-gray-l4 p-2 rounded-md"
        >
          <X size={24} />
        </button>
      </div>

      <PromptIcon type={type} classes="mb-6 sm:mb-8 mt-4 sm:mt-12" />
      <div className="px-6 pb-4 text-center text-navy-l1 dark:text-navy-l2">
        {children}
      </div>
      <div className="p-3 sm:px-8 sm:py-4 empty:h-12 w-full text-center sm:text-right bg-blue-l5 border-t border-gray-l4">
        <Link
          to=".."
          preventScrollReset
          replace
          type="button"
          className="inline-block btn-blue px-8 py-2 max-sm:w-full"
        >
          {type === "success" ? "Done" : "Ok"}
        </Link>
      </div>
    </Modal>
  );
}
