import { Listbox } from "@headlessui/react";
import { ReactElement, useMemo } from "react";
import { FieldValues, Path, useController } from "react-hook-form";

type OptionType = { label: string; value: any };

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  options: OptionType[];
  disabled?: true;
}

export default function Selector<T extends FieldValues>(props: Props<T>) {
  const {
    formState: { isSubmitting },
    field: { value, onChange },
  } = useController<T>({ name: props.name });

  const display = useMemo(
    () =>
      props.options.find((o) => o.value === value)?.label || props.placeholder,
    [value, props.options]
  );

  return (
    <Listbox value={value} onChange={onChange} as="div" className="relative">
      <Listbox.Button
        disabled={props.disabled || isSubmitting}
        className="bg-white text-left rounded-md outline-none border-none w-full px-3 py-2 text-black"
      >
        {display}
      </Listbox.Button>
      <Listbox.Options className="z-10 mt-2 w-full absolute top-full right-0 bg-white-grey rounded-md shadow-md">
        {props.options.map((option) => (
          <Listbox.Option
            key={option.value}
            value={option.value}
            className="text-angel-grey cursor-pointer p-1 px-2 hover:bg-sky-100/50"
          >
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
