import type { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { unpack } from "helpers/unpack";
import { nanoid } from "nanoid";
import {
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
  useMemo,
} from "react";
import type { Classes } from "./types";

type El = HTMLInputElement;

interface Base
  extends Pick<InputHTMLAttributes<El>, "placeholder" | "inputMode" | "type"> {}

interface Props extends Base {
  mask: MaskitoOptions;
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

export const MaskedInput = forwardRef<El, Props>((props, ref) => {
  const id = useMemo(() => nanoid(6), []);
  const maskitoRef = useMaskito({ options: props.mask });
  // extract `required` to disable native validation
  const style = unpack(props.classes);
  const errorId = `error_${id}`;

  return (
    <div className={style.container + " "}>
      <label
        data-required={props.required}
        className={style.label + ` label ${props.sub ? "" : "mb-2"}`}
        htmlFor={id}
      >
        {props.label}
      </label>
      {props.sub ? (
        typeof props.sub === "string" ? (
          <p className="text-gray text-sm mb-2">{props.sub}</p>
        ) : (
          props.sub
        )
      ) : null}

      <input
        type={props.type ?? "text"}
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
        inputMode={props.inputMode}
        placeholder={props.placeholder}
        value={props.value}
        aria-invalid={!!props.error}
        aria-disabled={props.disabled}
        aria-errormessage={errorId}
        className={`${style.input} field-input`}
        autoComplete="off"
        spellCheck={false}
        onInput={(e) => props.onChange(e.currentTarget.value)}
      />

      <p id={errorId} className={`${style.error} field-err mt-1 empty:hidden`}>
        {props.error}
      </p>
    </div>
  );
});
