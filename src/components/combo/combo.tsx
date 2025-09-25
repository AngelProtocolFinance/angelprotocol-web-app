import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  Field,
  Label,
} from "@headlessui/react";
import { unpack } from "helpers/unpack";
import { X } from "lucide-react";
import { type ReactElement, type ReactNode, forwardRef, useState } from "react";

import { Options } from "./options";

type El = HTMLInputElement;

interface BaseProps {
  options: string[];
  option_disp: (opt: string) => ReactNode;
  btn_disp: (opt: string, open: boolean) => ReactElement;
  onReset?: () => void;
  required?: boolean;
  label?: ReactNode;
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
  onChange: (country: string) => void;
  error?: string;
}

export const Combo = forwardRef<El, Props>((props, ref) => {
  const cls = unpack(props.classes);
  const [query, setQuery] = useState(props.value);
  return (
    <Field className={`w-full ${cls.container} grid content-start`}>
      <Label
        data-required={props.required}
        className={`${cls.label} label empty:hidden mb-2`}
      >
        {props.label}
      </Label>
      <Combobox
        disabled={props.disabled}
        value={props.value}
        onChange={(c) => c && props.onChange(c)}
        as="div"
        className="relative"
      >
        <ComboboxButton className="absolute left-4 top-1/2 -translate-y-1/2">
          {({ open }) => props.btn_disp(props.value, open)}
        </ComboboxButton>

        <ComboboxInput
          ref={ref}
          placeholder={props.placeholder}
          onChange={(event) => setQuery(event.target.value as any)}
          className={props.classes?.input + ` field-input w-full h-full`}
        />

        {props.value && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-red hover:text-red-l1 active:text-red-d1 "
            onClick={() => {
              props.onChange("");
              setQuery("");
              props.onReset?.();
            }}
          >
            <X size={16} />
          </button>
        )}

        <Options
          query={query}
          options={props.options}
          option_disp={props.option_disp}
        />
      </Combobox>
      <span className={cls.error + " empty:hidden field-err mt-1"}>
        {props.error}
      </span>
    </Field>
  );
});
