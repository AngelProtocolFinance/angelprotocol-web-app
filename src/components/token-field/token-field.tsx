import { humanize } from "helpers/decimal";
import { unpack } from "helpers/unpack";
import { forwardRef } from "react";
import type { ITokenField } from "./types";

type El = HTMLInputElement;

const Field: React.ForwardRefRenderFunction<El, ITokenField> = (props, ref) => {
  const style = unpack(props.classes);

  return (
    <div className={`grid gap-y-1 ${style.container}`}>
      <label
        htmlFor="amount"
        className={` font-medium mr-auto after:content-['_*'] after:text-red ${style.label}`}
      >
        {props.label}
      </label>
      {props.min_amount}

      <div className="grid grid-cols-[auto_1fr] field-input-container rounded-lg pr-5 divide-x divide-gray-l3">
        {props.combobox}
        {/** match input text, and append $ value */}
        <div className="relative h-full w-full">
          <input
            ref={ref}
            value={props.amount}
            onChange={(e) => props.on_change(e.target.value)}
            aria-invalid={!!props.error}
            disabled={props.disabled}
            autoComplete="off"
            id="amount"
            type="text"
            placeholder="Enter amount"
            className={`outline-none w-full h-full ${style.input} bg-transparent placeholder: text-base pl-2 py-[13px]  font-medium`}
          />
          {props.amount_usd ? (
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2">
              <span className="invisible mr-1 text-base">{props.amount}</span>{" "}
              <span className="text-gray text-sm">
                ~${humanize(props.amount_usd)}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {props.error && (
        <p data-error className="peer text-red text-xs text-right mt-0.5">
          {props.error}
        </p>
      )}
    </div>
  );
};

export const TokenField = forwardRef(Field);
