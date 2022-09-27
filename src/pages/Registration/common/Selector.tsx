import { Listbox } from "@headlessui/react";
import { useMemo } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import Icon from "components/Icon";

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
    [value, props.options, props.placeholder]
  );

  return (
    <Listbox
      disabled={isSubmitting || props.disabled}
      value={value}
      onChange={onChange}
      as="div"
      className="relative"
    >
      <Listbox.Button className="flex items-center bg-zinc-50 disabled:bg-zinc-50/10 text-left rounded-md outline-none border-none w-full px-3 py-2 text-black">
        {({ open }) => (
          <>
            <span>{display}</span>
            <Icon
              type={open ? "Down" : "CaretLeft"}
              className="text-angel-grey ml-auto"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="z-10 mt-2 w-full h-[15rem] overflow-y-auto absolute top-full right-0 bg-white rounded-md shadow-md">
        {props.options.map((option) => (
          <Listbox.Option
            key={option.value}
            value={option.value}
            className={({ selected }) =>
              `cursor-pointer p-1 px-2 hover:bg-sky-200/50 ${
                selected ? "bg-sky-500 text-zinc-50" : "text-angel-grey"
              }`
            }
          >
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
