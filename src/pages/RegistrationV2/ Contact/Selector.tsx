import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren, useState } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { DrawerIcon } from "components/Icon";
import { errorStyle } from "components/registration";

type Props<T extends FieldValues> = {
  options: string[];
  name: Path<T>;
  placeholder?: string;
};

export default function Selector<T extends FieldValues>({
  placeholder,
  options,
  name,
}: Props<T>) {
  const {
    formState: { errors },
  } = useFormContext<T>();
  const {
    field: { value: role, onChange: onRoleChange },
  } = useController<T>({ name });

  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={role}
      onChange={onRoleChange}
      as="div"
      className="relative flex justify-between items-center w-full rounded  border border-gray-l2 focus-within:outline-none focus-within:border-gray-d1 focus-within:dark:border-blue-l2 dark:border-bluegray bg-gray-l5 dark:bg-blue-d4 "
    >
      <Combobox.Input
        placeholder={placeholder}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full px-4 py-3.5 text-sm placeholder:text-gray-d1 dark:placeholder:text-gray focus:outline-none bg-transparent"
      />
      <Combobox.Button className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {({ open }) => <DrawerIcon isOpen={open} size={25} />}
      </Combobox.Button>
      <Combobox.Options className="rounded-sm text-sm border border-gray-l2 dark:border-bluegray absolute top-full mt-2 z-20 bg-gray-l5 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
        {filtered.map((option) => (
          <Combobox.Option key={option} value={option}>
            {({ active }) => <Item active={active}>{option}</Item>}
          </Combobox.Option>
        ))}
        {!!query && (
          <Combobox.Option key="__other" value={query}>
            {({ active }) => <Item active={active}>Other: {query}</Item>}
          </Combobox.Option>
        )}
      </Combobox.Options>
      <ErrorMessage
        errors={errors}
        name={name as any}
        as="p"
        className={errorStyle}
      />
    </Combobox>
  );
}

function Item({ active, children }: PropsWithChildren<{ active: boolean }>) {
  return (
    <li
      className={`px-4 py-2 cursor-pointer ${
        active ? "bg-blue-l2 dark:bg-blue-d2" : ""
      }`}
    >
      {children}
    </li>
  );
}
