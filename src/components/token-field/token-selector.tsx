import { Popover, PopoverButton } from "@headlessui/react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

export interface ITokenSelector {
  btn: "loading" | "error" | ReactNode;
  classes?: string;
  options: ReactNode;
}

export function TokenSelector({ btn, classes = "", options }: ITokenSelector) {
  return (
    <Popover className={`gap-1 flex justify-end dark:text-gray ${classes}`}>
      <PopoverButton
        disabled={btn === "loading"}
        className="outline-hidden px-5 rounded-l-lg"
      >
        {btn === "loading" ? (
          <LoaderCircle
            test-id="token-loader"
            className="animate-spin"
            size={20}
          />
        ) : btn === "error" ? (
          <CircleAlert test-id="token-error" className="text-red" size={20} />
        ) : (
          btn
        )}
      </PopoverButton>
      {options}
    </Popover>
  );
}
