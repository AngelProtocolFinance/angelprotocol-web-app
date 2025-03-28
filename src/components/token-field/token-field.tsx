import { humanize, roundToCents } from "helpers/decimal";
import { unpack } from "helpers/unpack";
import { forwardRef, useEffect, useState } from "react";
import { number } from "yup";
import TokenSelector from "./token-selector";
import type { Props, Token } from "./types";

type El = HTMLInputElement;

const multipliable = (amount: string) =>
  number().min(0).isValidSync(amount) ? +amount : 0;

const TokenField: React.ForwardRefRenderFunction<El, Props> = (props, ref) => {
  const style = unpack(props.classes);
  const [tokenState, setTokenState] = useState<Token.State>("ok");
  useEffect(() => {
    const eventName = "crypto-token-event" satisfies Token.Event.Name as string;
    const handler = (ev: CustomEvent<Token.Event.Detail>) =>
      setTokenState(ev.detail.state);
    window.addEventListener(eventName, handler as any);
    return () => {
      window.removeEventListener(eventName, handler as any);
    };
  }, []);

  return (
    <div className={`grid ${style.container}`}>
      <div className="flex items-center gap-2">
        <label
          htmlFor="amount"
          className={`font-semibold mr-auto mb-2 after:content-['_*'] after:text-red ${style.label}`}
        >
          {props.label}
        </label>
        <span className="text-gray text-sm mr-1">
          {tokenState === "ok"
            ? `$ ${humanize(
                props.token.rate * multipliable(props.token.amount),
                2
              )}`
            : "$ --"}
        </span>
      </div>

      <div className="relative">
        <input
          ref={ref}
          value={props.token.amount}
          onChange={(e) =>
            props.onChange({ ...props.token, amount: e.target.value })
          }
          aria-invalid={!!props.error}
          disabled={props.disabled || tokenState === "loading"}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="Enter amount"
          className={`field-input h-full ${style.input}`}
        />
        <TokenSelector
          classes="absolute top-1/2 -translate-y-1/2 right-4"
          tokenState={tokenState}
          token={props.token}
          onChange={props.onChange}
        />
      </div>
      {props.error && (
        <p data-error className="peer text-red text-xs text-left mt-1.5">
          {props.error}
        </p>
      )}
      {props.withMininum && props.token.min !== 0 && (
        <p className="text-xs mt-2 peer-data-[error=true]:mt-0">
          Minimum amount: {props.token.symbol}{" "}
          {roundToCents(
            props.token.min,
            props.token.rate,
            props.token.precision
          )}
        </p>
      )}
    </div>
  );
};

export default forwardRef(TokenField);
