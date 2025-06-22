import { useMaskito } from "@maskito/react";
import { unpack } from "helpers/unpack";
import { nanoid } from "nanoid";
import { type ReactElement, type ReactNode, forwardRef, useMemo } from "react";
import { currency_mask_opts, mask, unmask } from "./currency-mask";
import { Label } from "./label";
import type { Classes } from "./types";

type El = HTMLInputElement;

interface Props {
  placeholder?: string;
  classes?: Classes | string;
  label: string | ReactElement;
  sub?: ReactNode;
  required?: boolean; // extract to disable native validation
  onChange: (val: string) => void;
  disabled?: boolean;
  value: string;
  error?: string;
}

export const CurrencyField = forwardRef<El, Props>((props, ref) => {
  const id = useMemo(() => nanoid(6), []);
  const maskitoRef = useMaskito({ options: currency_mask_opts });
  // extract `required` to disable native validation
  const style = unpack(props.classes);
  const errorId = `error_${id}`;

  return (
    <div className={style.container + " "}>
      <Label
        className={style.label + ` label ${props.sub ? "" : "mb-2"}`}
        required={props.required}
        htmlFor={id}
      >
        {props.label}
      </Label>
      {props.sub ? (
        typeof props.sub === "string" ? (
          <p className="text-gray text-sm mb-2">{props.sub}</p>
        ) : (
          props.sub
        )
      ) : null}

      <input
        ref={(node) => {
          maskitoRef(node);
          if (!ref) return;
          if (typeof ref === "function") {
            ref(node);
          } else {
            ref.current = node;
          }
        }}
        id={id}
        placeholder={props.placeholder}
        value={mask(props.value)}
        type="text"
        inputMode="numeric"
        aria-invalid={!!props.error}
        aria-disabled={props.disabled}
        aria-errormessage={errorId}
        className={`${style.input} field-input`}
        autoComplete="off"
        spellCheck={false}
        onInput={(e) => props.onChange(unmask(e.currentTarget.value))}
      />

      <p id={errorId} className={`${style.error} field-err mt-1 empty:hidden`}>
        {props.error}
      </p>
    </div>
  );
});
