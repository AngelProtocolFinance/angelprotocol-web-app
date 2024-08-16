import { unpack } from "helpers";
import { forwardRef, useEffect, useState } from "react";
import TokenSelector from "./TokenSelector";
import { tokenEvents } from "./TokenSelector/common";
import type { Props } from "./types";

type El = HTMLInputElement;
type TokenState = "loading" | "error" | "ok";
const TokenField: React.ForwardRefRenderFunction<El, Props> = (props, ref) => {
  const style = unpack(props.classes);
  const [tokenState, setTokenState] = useState<TokenState>("ok");
  useEffect(() => {
    const handleLoading = () => setTokenState("loading");
    const handleOk = () => setTokenState("ok");
    const handleError = () => setTokenState("error");
    window.addEventListener(tokenEvents.loading, handleLoading);
    window.addEventListener(tokenEvents.ok, handleOk);
    window.addEventListener(tokenEvents.error, handleError);
    return () => {
      window.removeEventListener(tokenEvents.loading, handleLoading);
      window.removeEventListener(tokenEvents.ok, handleOk);
      window.removeEventListener(tokenEvents.error, handleError);
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
        className={`${style.inputContainer} relative grid grid-cols-[1fr_auto] items-center gap-2 field-container peer`}
      >
        <input
          ref={ref}
          value={props.token.amount}
          onChange={(e) =>
            props.onChange({ ...props.token, amount: e.target.value })
          }
          disabled={props.disabled || tokenState === "loading"}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="Enter amount"
          className="text-sm py-3.5 dark:text-navy-l2"
        />
        <TokenSelector token={props.token} onChange={props.onChange} />
        <p data-error className="field-error left-0 text-left empty:hidden">
          {props.error}
        </p>
      </div>
      {props.withMininum && props.token.min !== 0 && (
        <p className="text-xs mt-2 peer-has-[[data-error]]:mt-5">
          Minimal amount: {props.token.code} {props.token.min}
        </p>
      )}
    </div>
  );
};

export default forwardRef(TokenField);
