import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Link, useNavigate } from "@remix-run/react";
import { X } from "lucide-react";
import type { PropsWithChildren } from "react";
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
    <Dialog open={open ?? true} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
      <DialogPanel className="fixed-center z-10 grid text-navy-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden">
        <div className="flex justify-end p-4 border-b border-gray-l4">
          <button
            type="button"
            onClick={close}
            className="border border-gray-l4 p-2 rounded-md"
            aria-label="Close"
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
      </DialogPanel>
    </Dialog>
  );
}
