import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import type { PropsWithChildren, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { PromptIcon } from "./prompt-icon";

interface Props extends PropsWithChildren {
  type?: "success" | "error" | "loading";
  ack?: ReactNode;
}

export default function PromptV2({ type, children }: Props) {
  const navigate = useNavigate();
  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
      <DialogPanel className="fixed-center z-10 grid text-navy-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden">
        <div className="flex justify-end p-4 border-b border-gray-l4">
          <Link
            to=".."
            preventScrollReset
            replace
            className="border border-gray-l4 p-2 rounded-md"
          >
            <Icon type="Close" size={24} />
          </Link>
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
