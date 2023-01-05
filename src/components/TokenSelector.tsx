import { Combobox } from "@headlessui/react";
import { useState } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { TokenWithAmount } from "types/slices";
import Icon, { DrawerIcon } from "./Icon";

type BaseFormValue = { [index: string]: TokenWithAmount };

export default function TokenSelector<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  tokens: TokenWithAmount[];
  fieldName: T[K] extends TokenWithAmount ? K : never;
  classes?: { container?: string; options?: string };
}) {
  const { setValue } = useFormContext<BaseFormValue>();
  const {
    field: { onChange: onTokenChange, value: token },
  } = useController<BaseFormValue>({
    name: props.fieldName,
  });

  const [symbol, setSymbol] = useState("");

  const filtered =
    symbol === ""
      ? props.tokens
      : props.tokens.filter((t) => {
          return t.symbol.includes(symbol.toLowerCase());
        });

  return (
    <Combobox
      value={token}
      onChange={(token: TokenWithAmount) => {
        onTokenChange(token);
        setValue("token.amount", token.amount);
      }}
      as="div"
      className={`${
        props.classes?.container ?? ""
      } flex items-center gap-1 w-full dark:text-gray`}
    >
      <span className="text-sm">{token.symbol}</span>

      {props.tokens.length > 1 && (
        <Combobox.Button className="">
          {({ open }) => <DrawerIcon isOpen={open} size={20} />}
        </Combobox.Button>
      )}

      <Combobox.Options
        className={`${
          props.classes?.options ?? ""
        } border border-gray-l2 dark:border-bluegray p-1 mt-10 max-h-60 w-max overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none`}
      >
        <div className="flex p-2 gap-2 border border-gray-l2 dark:border-bluegray rounded mb-1">
          <Icon type="Search" size={20} />
          <Combobox.Input
            placeholder="Search..."
            disabled={props.tokens.length <= 1}
            className="text-left text-sm focus:outline-none bg-transparent w-20"
            onChange={(event) => setSymbol(event.target.value)}
          />
        </div>
        {filtered.length === 0 && symbol !== "" ? (
          <div className="relative cursor-default select-none py-2 px-4text-sm">
            {symbol} not found
          </div>
        ) : (
          filtered.map((token) => (
            <Combobox.Option
              key={token.token_id}
              className={
                "flex items-center gap-2 p-3 hover:bg-blue-l4 dark:hover:bg-blue-d5 cursor-pointer"
              }
              value={token}
            >
              <img alt="" src={token.logo} className="w-6 h-6 object-contain" />
              <span className="text-sm">{token.symbol}</span>
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
}
