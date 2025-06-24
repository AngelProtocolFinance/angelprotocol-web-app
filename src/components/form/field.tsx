import { unpack } from "helpers/unpack";
import type React from "react";
import {
  type ForwardedRef,
  type HTMLInputTypeAttribute,
  type ReactElement,
  type ReactNode,
  createElement,
  forwardRef,
} from "react";
import { Label } from ".";
import type { Classes } from "./types";

const textarea = "textarea" as const;
type TextArea = typeof textarea;
type InputType = HTMLInputTypeAttribute | TextArea;

type Props<T extends InputType> = Omit<
  T extends TextArea
    ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
    : React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "id" | "spellCheck" | "type"
> & {
  classes?: Classes | string;
  tooltip?: ReactNode;
  label: string | ReactElement;
  sub?: ReactNode;
  type?: T;
};

function _Field<T extends InputType = InputType>(
  {
    type = "text" as T,
    label,
    classes,
    tooltip,
    required, //extract from props to disable native validation
    error,
    ...props
  }: Props<T> & { error?: string },
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const style = unpack(classes);

  const id = "__" + String(props.name);
  const errorId = "__error_" + String(props.name);

  return (
    <div className={style.container + " "}>
      <Label
        className={style.label + ` label ${props.sub ? "" : "mb-2"}`}
        required={required}
        htmlFor={id}
      >
        {label}
      </Label>
      {props.sub ? (
        typeof props.sub === "string" ? (
          <p className="text-gray text-sm mb-2">{props.sub}</p>
        ) : (
          props.sub
        )
      ) : null}

      {createElement(type === textarea ? textarea : "input", {
        ref,
        ...props,
        ...(type === textarea ? {} : { type }),
        id,
        "aria-invalid": !!error,
        "aria-disabled": props.disabled,
        "aria-errormessage": errorId,
        className: `${style.input} field-input`,
        autoComplete: "off",
        spellCheck: false,
      })}

      {(tooltip && ( //tooltip in normal flow
        <p className={style.error + " text-left mt-1 left-0 text-xs"}>
          {typeof tooltip === "string" ? (
            <span className="text-gray dark:text-gray">{tooltip}</span>
          ) : (
            tooltip
          )}{" "}
          <span
            id={errorId}
            className="empty:hidden text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden"
          >
            {error}
          </span>
        </p>
      )) || (
        <p
          id={errorId}
          className={style.error + " field-err mt-1 empty:hidden"}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export const Field = forwardRef(_Field) as typeof _Field;
