import { Popover, PopoverButton } from "@headlessui/react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { DrawerIcon } from "../../Icon";
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
              <LoaderCircle
                test-id="token-loader"
                className="animate-spin"
                size={20}
              />
            ) : tokenState === "error" ? (
              <CircleAlert
                test-id="token-error"
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
