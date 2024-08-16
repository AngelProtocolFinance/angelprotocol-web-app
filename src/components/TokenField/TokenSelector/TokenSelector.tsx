import { Popover, PopoverButton } from "@headlessui/react";
import { DrawerIcon } from "../../Icon";
import type { Props } from "../types";
import TokenOptions from "./TokenOptions";

type TTokenSelector = Pick<Props, "token" | "onChange">;
export default function TokenSelector({ onChange, token }: TTokenSelector) {
  return (
    <Popover className="relative gap-1 flex justify-end dark:text-navy-l2 h-full">
      <PopoverButton className="flex items-center gap-1 focus:outline-none">
        {({ open }) => (
          <>
            <span>{token.code}</span>
            <DrawerIcon isOpen={open} size={20} />
          </>
        )}
      </PopoverButton>
      <TokenOptions token={token} onChange={onChange} />
    </Popover>
  );
}
