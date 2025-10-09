import { humanize, round_to_cents } from "helpers/decimal";
import { unpack } from "helpers/unpack";
import { forwardRef, useEffect, useState } from "react";
import { number } from "yup";
import { TokenSelector } from "./token-selector";
import type { Props, Token } from "./types";

type El = HTMLInputElement;

const multipliable = (amount: string) =>
  number().min(0).isValidSync(amount) ? +amount : 0;

const Field: React.ForwardRefRenderFunction<El, Props> = (props, ref) => {
  const style = unpack(props.classes);
  const [token_state, set_token_state] = useState<Token.State>("ok");
  useEffect(() => {
    const eventName = "crypto-token-event" satisfies Token.Event.Name as string;
    const handler = (ev: CustomEvent<Token.Event.Detail>) =>
      set_token_state(ev.detail.state);
    window.addEventListener(eventName, handler as any);
    return () => {
      window.removeEventListener(eventName, handler as any);
    };
  }, []);

  const m = multipliable(props.token.amount);
  const $ = m && props.token.code ? m * props.token.rate : 0;

  return (
    <div className={`grid ${style.container}`}>
      <label
        htmlFor="amount"
        className={`font-semibold mr-auto after:content-['_*'] after:text-red ${style.label}`}
      >
        {props.label}
      </label>
      {props.with_min && props.token.min !== 0 ? (
        <p className="text-xs my-0.5">
          Minimum amount: {props.token.symbol}{" "}
          {round_to_cents(
            props.token.min,
            props.token.rate,
            props.token.precision
          )}
        </p>
      ) : (
        <div className="py-1" />
      )}
      {/** match input text, and append $ value */}
      <div className="relative">
        {$ ? (
          <div className="absolute top-1/2 -translate-y-1/2 left-4 select-none">
            <span className="invisible mr-2">{props.token.amount}</span>{" "}
            <span className="text-gray text-sm">~${humanize($)}</span>
          </div>
        ) : null}
        <input
          ref={ref}
          value={props.token.amount}
          onChange={(e) =>
            props.on_change({ ...props.token, amount: e.target.value })
          }
          aria-invalid={!!props.error}
          disabled={props.disabled || token_state === "loading"}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="Enter amount"
          className={`field-input h-full ${style.input}`}
        />

        <TokenSelector
          classes="absolute top-1/2 -translate-y-1/2 right-4"
          token_state={token_state}
          token={props.token}
          on_change={props.on_change}
        />
      </div>
      {props.error && (
        <p data-error className="peer text-red text-xs text-left mt-1.5">
          {props.error}
        </p>
      )}
    </div>
  );
};

export const TokenField = forwardRef(Field);
