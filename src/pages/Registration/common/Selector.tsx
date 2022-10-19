import { Listbox } from "@headlessui/react";
import { useMemo } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import Icon from "components/Icon";

type OptionType = { label: string; value: any };
export type Classes = { button?: string; option?: string };

interface Props<T extends FieldValues> {
  classes?: Classes;
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
      <Listbox.Button
        className={`${
          props.classes?.button ?? ""
        } flex items-center bg-white disabled:bg-zinc-50/10 text-left rounded-md outline-none border-none w-full text-black`}
      >
        {({ open }) => (
          <>
            <span>{display}</span>
            <Icon
              type={open ? "Down" : "CaretLeft"}
              className="text-gray-d2 ml-auto"
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
              `${
                props.classes?.option ?? ""
              } cursor-pointer hover:bg-blue-l4/50 ${
                selected ? "bg-blue text-white" : "text-gray-d2"
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
