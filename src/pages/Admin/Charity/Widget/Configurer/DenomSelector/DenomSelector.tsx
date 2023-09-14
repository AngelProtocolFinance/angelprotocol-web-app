import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useController } from "react-hook-form";
import { FormValues } from "../types";
import { Token } from "types/aws";
import Icon, { DrawerIcon } from "components/Icon";
import { FocusableInput } from "components/Selector";
import Options from "./Options";

export default function DenomSelector() {
  const {
    formState: { errors },
    field: { value: selected, onChange: onSelectedChange, ref },
  } = useController<FormValues, "tokenWhitelist">({
    name: "tokenWhitelist",
  });

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

        <Options selected={selected} onSelectedChange={onSelectedChange} />

        <ErrorMessage
          name="tokenWhitelist"
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
