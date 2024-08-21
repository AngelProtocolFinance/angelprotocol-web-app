import { unpack } from "helpers";
import { forwardRef, useEffect, useState } from "react";
import TokenSelector from "./TokenSelector";
import type { Props, Token } from "./types";

type El = HTMLInputElement;

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
      <label
        htmlFor="amount"
        className={`font-semibold mr-auto mb-2 after:content-['_*'] after:text-red ${style.label}`}
      >
        {props.label}
      </label>

      <div
        className={`${style.inputContainer} relative grid grid-cols-[1fr_auto] items-center gap-2 field-container`}
      >
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
          className="text-sm py-3.5 dark:text-navy-l2"
        />
        <TokenSelector
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
          Minimum amount: {props.token.code} {props.token.min}
        </p>
      )}
    </div>
  );
};

export default forwardRef(TokenField);
