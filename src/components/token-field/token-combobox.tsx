import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
} from "@headlessui/react";
import { unpack } from "helpers/unpack";
import type { ReactElement } from "react";

interface Classes {
  container?: string;
  input?: string;
}

interface ITokenCombobox<T> {
  disabled?: boolean;
  on_change: (v: T) => void;
  value: T;
  value_disp?: T extends string ? never : (v: T) => string;
  input_disp: (v: T) => string;
  btn_disp: (open: boolean) => ReactElement;
  by?: T extends object ? keyof T : never;
  opts: T[];

  q: string;
  on_q_change: (v: string) => void;

  opt_disp: (v: T) => ReactElement;
  classes?: Classes | string;
}

const options_classes =
  "w-56 border border-gray-l3 p-1 [--anchor-max-height:15rem] overflow-y-auto rounded-md bg-gray-l5 shadow-lg focus:outline-hidden";

export function TokenCombobox<T>(props: ITokenCombobox<T>) {
  const s = unpack(props.classes);
  const not_found_txt =
    props.opts.length === 0 && props.q !== "" ? `${props.q} not found` : null;
  return (
    <Combobox
      immediate
      disabled={props.disabled}
      as="fieldset"
      by={props.by as any}
      className={`${s.container} relative flex`}
      value={props.value}
      virtual={{ options: props.opts }}
      onChange={(v) => v && props.on_change(v)}
    >
      <ComboboxInput<T>
        placeholder="Select token"
        displayValue={(x) => props.input_disp(x)}
        onBlur={not_found_txt ? () => props.on_q_change("") : undefined}
        className="w-full text-left text-sm focus:outline-hidden bg-transparent px-4"
        onChange={(event) => props.on_q_change(event.target.value)}
      />
      <ComboboxButton className="absolute right-4 top-1/2 -translate-y-1/2">
        {({ open }) => props.btn_disp(open)}
      </ComboboxButton>

      {not_found_txt ? (
        <div
          className={`${options_classes} absolute left-0 -bottom-8 bg-white z-10`}
        >
          {not_found_txt}
        </div>
      ) : (
        <ComboboxOptions
          className={options_classes}
          anchor={{ to: "bottom start", gap: 8 }}
        >
          {({ option }) => props.opt_disp(option as T)}
        </ComboboxOptions>
      )}
    </Combobox>
  );
}
