import { Combobox, ComboboxInput, Field, Label } from "@headlessui/react";
import { unpack } from "helpers/unpack";
import { X } from "lucide-react";
import { type ReactNode, forwardRef, useState } from "react";

import { Options } from "./options";

type El = HTMLInputElement;

interface BaseProps {
  options: string[];
  option_disp: (opt: string) => ReactNode;
  required?: boolean;
  allow_custom?: boolean;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
    error?: string;
    label?: string;
  };
}
interface Props extends BaseProps {
  value: string;
  on_change: (val: string) => void;
  error?: string;
}

export const ComboInline = forwardRef<El, Props>((props, ref) => {
  const cls = unpack(props.classes);
  const [query, set_query] = useState(props.value);
  return (
    <Field className={`w-full ${cls.container} grid content-start`}>
      <Combobox
        immediate
        disabled={props.disabled}
        value={props.value}
        onChange={(c) => c && props.on_change(c)}
        as="div"
        className="relative group"
      >
        <ComboboxInput
          ref={ref}
          placeholder=""
          onChange={(event) => set_query(event.target.value as any)}
          className={`${props.classes?.input} text-sm w-full px-4 py-3.5 border border-gray-l3 rounded outline-blue-d1 group-[:has([data-error])]:border-red`}
        />

        <Label
          data-required={props.required}
          className={`${cls.label} label-floating`}
        >
          {props.label}{" "}
          {props.error && (
            <span data-error className="text-xs text-red font-normal">
              {props.error}
            </span>
          )}
        </Label>

        {props.value && (
          <button
            disabled={props.disabled}
            className="absolute right-0 p-4 inset-y-0 transform disabled:text-gray text-red hover:text-red-l1 active:text-red-d1 "
            onClick={() => {
              props.on_change("");
              set_query("");
            }}
          >
            <X size={16} />
          </button>
        )}

        <Options
          query={query}
          options={
            props.allow_custom && query.length > 0
              ? [query].concat(props.options)
              : props.options
          }
          option_disp={props.option_disp}
        />
      </Combobox>
    </Field>
  );
});
