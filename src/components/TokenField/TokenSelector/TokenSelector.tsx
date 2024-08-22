import { Popover, PopoverButton } from "@headlessui/react";
import Icon, { DrawerIcon } from "../../Icon";
import type { Props, Token } from "../types";
import TokenOptions from "./TokenOptions";

interface ITokenSelector extends Pick<Props, "token" | "onChange"> {
  tokenState: Token.State;
}
export default function TokenSelector({
  onChange,
  token,
  tokenState,
}: ITokenSelector) {
  return (
    <Popover className="relative gap-1 flex justify-end dark:text-navy-l2 h-full">
      <PopoverButton
        disabled={tokenState === "loading"}
        className="flex items-center gap-1 focus:outline-none"
      >
        {({ open }) => (
          <>
            {tokenState === "ok" && <span>{token.symbol}</span>}
            {tokenState === "loading" ? (
              <Icon
                test-id="token-loader"
                type="Loading"
                className="animate-spin"
                size={20}
              />
            ) : tokenState === "error" ? (
              <Icon
                test-id="token-error"
                type="Info"
                className="text-red"
                size={20}
              />
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
