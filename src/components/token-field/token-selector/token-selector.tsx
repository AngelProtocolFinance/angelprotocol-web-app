import { Popover, PopoverButton } from "@headlessui/react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { DrawerIcon } from "../../icon";
import type { Props, Token } from "../types";
import { TokenOptions } from "./token-options";

interface ITokenSelector extends Pick<Props, "token" | "on_change"> {
  token_state: Token.State;
  classes?: string;
}
export function TokenSelector({
  on_change,
  token,
  token_state,
  classes = "",
}: ITokenSelector) {
  return (
    <Popover className={`gap-1 flex justify-end dark:text-gray ${classes}`}>
      <PopoverButton
        disabled={token_state === "loading"}
        className="flex items-center gap-1 focus:outline-hidden px-5 rounded-l-lg"
      >
        {token_state === "ok" && (
          <span
            style={{ color: token.color }}
            className={`${token.code ? "font-semibold" : ""}`}
          >
            {token.symbol}
          </span>
        )}
        {token_state === "loading" ? (
          <LoaderCircle
            test-id="token-loader"
            className="animate-spin"
            size={20}
          />
        ) : token_state === "error" ? (
          <CircleAlert test-id="token-error" className="text-red" size={20} />
        ) : null}
      </PopoverButton>
      <TokenOptions token={token} on_change={on_change} amnt={token.amount} />
    </Popover>
  );
}
