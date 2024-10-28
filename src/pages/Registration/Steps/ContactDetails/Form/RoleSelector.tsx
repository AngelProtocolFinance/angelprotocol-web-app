import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { roleOptions } from "../constants";
import type { RoleOption } from "./schema";

interface Props {
  disabled?: boolean;
  value: RoleOption;
  onChange: (value: RoleOption) => void;
  error?: string;
  classes?: string;
}

function Star() {
  return <span className="text-red">*</span>;
}

export const RoleSelector = forwardRef<HTMLButtonElement, Props>(function List(
  { classes = "", ...props },
  ref
) {
  return (
    <Field className={`${classes} grid`}>
      <Label className="text-sm mb-1 block">
        What's your role within the organization? <Star />
      </Label>
      <Listbox
        disabled={props.disabled}
        value={props.value}
        by="value"
        onChange={props.onChange}
        as="div"
        className=""
      >
        <ListboxButton
          ref={ref}
          className="group focus:outline outline-2 outline-blue-d1 outline-offset-[3px] flex items-center text-sm justify-between w-full px-4 py-3.5 text-navy-d4 border border-gray-l3 font-heading rounded disabled:bg-gray-l5 disabled:text-navy-l1"
        >
          <span>{props.value.label}</span>
          <ChevronDown
            size={20}
            className="group-data-[open]:rotate-180 transition-transform ease-in-out"
          />
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: "bottom", gap: 5, padding: 10 }}
          className="border border-gray-l3 w-[var(--button-width)] bg-white z-10 rounded h-40"
        >
          {roleOptions.map((o) => (
            <ListboxOption
              key={o.value}
              value={o}
              className="py-1 px-4 hover:bg-blue-l4 text-sm font-heading data-[selected]:text-blue"
            >
              {o.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
        <p className="mt-1 text-right text-xs text-red empty:hidden">
          {props.error}
        </p>
      </Listbox>
    </Field>
  );
});
