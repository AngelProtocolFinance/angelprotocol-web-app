import { Popover, PopoverButton } from "@headlessui/react";
import Icon, { DrawerIcon } from "../../Icon";
import type { Props, TokenState } from "../types";
import TokenOptions from "./TokenOptions";

interface ITokenSelector extends Pick<Props, "token" | "onChange"> {
  tokenState: TokenState;
}
export default function TokenSelector({
  onChange,
  token,
  tokenState,
}: ITokenSelector) {
  console.log({ tokenState });
  return (
    <Popover className="relative gap-1 flex justify-end dark:text-navy-l2 h-full">
      <PopoverButton
        disabled={tokenState === "loading"}
        className="flex items-center gap-1 focus:outline-none"
      >
        {({ open }) => (
          <>
            {tokenState === "ok" && <span>{token.code}</span>}
            {tokenState === "loading" ? (
              <Icon type="Loading" className="animate-spin" size={20} />
            ) : tokenState === "error" ? (
              <Icon type="Info" className="text-red" size={20} />
            ) : (
              <DrawerIcon isOpen={open} size={24} />
            )}
          </>
        )}
      </PopoverButton>
      <TokenOptions token={token} onChange={onChange} />
    </Popover>
  );
}
