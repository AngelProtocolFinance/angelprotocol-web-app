import { Combobox as HuiCombobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { DrawerIcon } from "components/Icon";
import QueryLoader, { QueryState } from "components/QueryLoader";
import useDebouncer from "hooks/useDebouncer";

type BaseFormShape<T extends FieldValues, K extends Path<T>> = {
  [index: string]: T[K];
};

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller";

export default function Combobox<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  fieldName: K;
  optionsQueryState: QueryState<T[K][]>;
  displayValue(value: T[K]): string;
  onReset?(): void;
  onQueryChange(query: string): void;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
    error?: string;
  };
}) {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<BaseFormShape<T, K>>();

  const {
    field: { value, onChange, ref },
  } = useController<BaseFormShape<T, K>>({
    name: props.fieldName as any,
  });

  const [query, setQuery] = useState(value.name);

  const [debouncedQuery] = useDebouncer(query, 500);

  useEffect(() => props.onQueryChange(debouncedQuery), [props, debouncedQuery]);

  return (
    <HuiCombobox
      aria-disabled={isSubmitting}
      value={value}
      onChange={onChange}
      as="div"
      className={`relative items-center grid grid-cols-[1fr_auto] w-full field-container ${
        props.classes?.container || ""
      }`}
    >
      <HuiCombobox.Input
        ref={ref}
        placeholder={props.placeholder}
        onChange={(event) => setQuery(event.target.value)}
        displayValue={props.displayValue}
        className={`pl-4 ${props.classes?.input}`}
      />

      <HuiCombobox.Button>
        {({ open }) => <DrawerIcon isOpen={open} size={25} className="mx-1" />}
      </HuiCombobox.Button>

      <QueryLoader
        queryState={props.optionsQueryState}
        messages={{
          loading: "loading options..",
          error: "failed to get country options",
          empty: debouncedQuery
            ? `${debouncedQuery} not found`
            : "no options found",
        }}
        classes={{ container: containerStyle + " p-2" }}
      >
        {(endowIdNames) => (
          <HuiCombobox.Options
            className={containerStyle}
            style={{ height: endowIdNames.length <= 10 ? "auto" : "10rem" }}
          >
            {(endowIdNames.length > 0 &&
              endowIdNames.map((endowIdName) => (
                <HuiCombobox.Option
                  as={React.Fragment}
                  key={endowIdName.name}
                  value={endowIdName}
                >
                  {({ active }) => (
                    <li
                      className={`${
                        active ? "bg-blue-l2 dark:bg-blue-d1" : ""
                      } cursor-pointer flex gap-2 p-2 text-sm`}
                    >
                      <span>{endowIdName.name}</span>
                    </li>
                  )}
                </HuiCombobox.Option>
              ))) || (
              <div className="p-2 text-sm">{debouncedQuery} not found</div>
            )}
          </HuiCombobox.Options>
        )}
      </QueryLoader>

      <ErrorMessage
        errors={errors}
        name={props.fieldName as any}
        as="span"
        className={props.classes?.error}
      />
    </HuiCombobox>
  );
}
