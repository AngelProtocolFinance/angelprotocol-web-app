import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useController } from "react-hook-form";
import { FormValues } from "../types";
import { TokenWithChainID } from "types/aws";
import Icon, { DrawerIcon } from "components/Icon";
import Image from "components/Image";
import { FocusableInput } from "components/Selector";
import { chains } from "constants/chains";
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
                    key={opt.token_id + opt.chain_id}
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
  option: TokenWithChainID;
  selected: TokenWithChainID[];
  onChange(value: TokenWithChainID[]): void;
};

function SelectedOption({ selected, onChange, option }: SelectedProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] justify-items-start items-center p-1 gap-2 bg-blue-l4 dark:bg-blue-d4 border border-prim rounded text-gray-d1 dark:text-gray">
      <Image
        src={option.logo}
        className="w-4 h-4 rounded-full"
        alt="token logo"
      />
      <span className="max-w-[200px] truncate text-sm">{option.symbol}</span>
      <button
        className="col-start-3 row-span-2"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onChange(selected.filter((s) => s.token_id !== option.token_id));
        }}
      >
        <Icon type="Close" size={20} />
      </button>
      <span className="text-2xs font-work px-2 bg-orange/20 col-span-2 uppercase">
        {chains[option.chain_id].name}
      </span>
    </div>
  );
}
