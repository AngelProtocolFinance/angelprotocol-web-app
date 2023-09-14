import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import { Token } from "types/aws";
import Icon, { DrawerIcon } from "components/Icon";
import { FocusableInput } from "components/Selector";

interface Props<T extends FieldValues, K extends Path<T>> {
  name: PathValue<T, K> extends Token[] ? K : never;
  options: Token[];
}

export function TokenSelector<T extends FieldValues, K extends Path<T>>({
  name,
  options,
}: Props<T, K>) {
  ///// ***HOOK FORM*** /////
  const {
    formState: { errors },
    field: { value: selected, onChange: onSelectedChange, ref },
  } = useController<{ [index: string]: Token[] }>({ name: name });
  const { resetField } = useFormContext<T>();

  const isAllSelected = selected.length === options.length;

  return (
    <>
      <Combobox
        value={selected}
        by="symbol"
        onChange={onSelectedChange}
        as="div"
        className="relative bg-white dark:bg-blue-d6"
        multiple
      >
        <FocusableInput ref={ref} />
        <Combobox.Button
          as="div"
          className="flex items-center field-input min-h-[3rem] justify-between peer-focus:border-gray-d1 peer-focus:dark:border-blue-l2 cursor-pointer p-1"
        >
          {({ open }) => (
            <>
              <span className="flex flex-wrap gap-2 h-full">
                {selected.map((opt) => (
                  <SelectedOption
                    key={opt.token_id}
                    option={opt}
                    selected={selected}
                    onChange={onSelectedChange}
                  />
                ))}
              </span>
              <DrawerIcon
                isOpen={open}
                size={25}
                className="justify-self-end dark:text-gray shrink-0"
              />
            </>
          )}
        </Combobox.Button>
        <Combobox.Options className="rounded-sm text-sm border border-prim absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
          <div className="flex justify-between p-4">
            {isAllSelected ? (
              <Action onClick={() => onSelectedChange([])}>Deselect All</Action>
            ) : (
              <Action onClick={() => onSelectedChange(options)}>
                Select All
              </Action>
            )}

            <Action onClick={() => resetField(name)}>Reset</Action>
          </div>

          {options.map((o) => (
            <Combobox.Option
              key={o.token_id}
              value={o}
              className={({ active, selected }) =>
                optionStyle(selected, active)
              }
            >
              {o.symbol}
            </Combobox.Option>
          ))}
        </Combobox.Options>
        <ErrorMessage
          name={name}
          errors={errors}
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </Combobox>
    </>
  );
}

type SelectedProps = {
  option: Token;
  selected: Token[];
  onChange(value: Token[]): void;
};

function SelectedOption({ selected, onChange, option }: SelectedProps) {
  return (
    <div className="flex items-center px-3 gap-2 h-10 bg-blue-l4 dark:bg-blue-d4 border border-prim rounded font-semibold text-gray-d1 dark:text-gray uppercase">
      <span className="max-w-[200px] truncate">{option.symbol}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onChange(selected.filter((s) => s.token_id !== option.token_id));
        }}
      >
        <Icon type="Close" size={20} />
      </button>
    </div>
  );
}

function Action(props: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button
      type="button"
      className="cursor-pointer text-blue hover:text-orange hover:underline"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

const optionStyle = (selected: boolean, active: boolean) =>
  `px-4 py-2 cursor-pointer ${
    selected
      ? "bg-blue-l2  dark:bg-blue-d1"
      : active
      ? "cursor-pointer bg-blue-l3 dark:bg-blue-d2"
      : ""
  }`;
