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
        <p className="text-xs my-1">
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

      <div className="grid grid-cols-[auto_1fr] field-input-container rounded-lg pr-5 divide-x divide-gray-l3">
        <TokenSelector
          classes=""
          token_state={token_state}
          token={props.token}
          on_change={props.on_change}
        />
        {/** match input text, and append $ value */}
        <div className="relative h-full w-full">
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
            className={`outline-none w-full h-full ${style.input} bg-transparent placeholder:font-medium text-base pl-2 py-[13px] font-semibold`}
          />
          {$ ? (
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2">
              <span className="invisible mr-1 text-base">
                {props.token.amount}
              </span>{" "}
              <span className="text-gray text-sm">~${humanize($)}</span>
            </div>
          ) : null}
        </div>
      </div>

      {props.error && (
        <p data-error className="peer text-red text-xs text-right mt-1.5">
          {props.error}
        </p>
      )}
    </div>
  );
};

export const TokenField = forwardRef(Field);
