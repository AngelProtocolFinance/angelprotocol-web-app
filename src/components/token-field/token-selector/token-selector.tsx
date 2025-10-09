import { Popover, PopoverButton } from "@headlessui/react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { DrawerIcon } from "../../icon";
import type { Props, Token } from "../types";
import { TokenOptions } from "./token-options";

interface ITokenSelector extends Pick<Props, "token" | "onChange"> {
  tokenState: Token.State;
  classes?: string;
}
export function TokenSelector({
  onChange,
  token,
  tokenState,
  classes = "",
}: ITokenSelector) {
  return (
    <Popover className={`gap-1 flex justify-end dark:text-gray ${classes}`}>
      <PopoverButton
        disabled={tokenState === "loading"}
        className="flex items-center gap-1 focus:outline-hidden"
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
              <DrawerIcon is_open={open} size={20} />
            )}
          </>
        )}
      </PopoverButton>
      <TokenOptions token={token} onChange={onChange} />
    </Popover>
  );
}
