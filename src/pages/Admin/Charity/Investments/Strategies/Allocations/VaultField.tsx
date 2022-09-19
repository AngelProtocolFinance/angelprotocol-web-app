import { ErrorMessage } from "@hookform/error-message";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { StrategyFormValues } from "./types";
import Icon from "components/Icon";
import { Cells } from "components/TableSection";
import { roundDownToNum } from "helpers";

type Props = {
  name: string;
  idx: number;
  remove: UseFieldArrayRemove;
  color: string;
  static?: true;
};

export default function VaultField({ name, idx, color, remove }: Props) {
  const { register } = useFormContext<StrategyFormValues>();
  return (
    <Cells
      type="td"
      cellClass="p-2 items-center relative text-zinc-50/80 font-heading"
    >
      <div className="flex items-center gap-2">
        <div className={`${color} w-4 h-4 rounded-full`} />
        <span className="font-mono">{name}</span>
      </div>

      <input
        className="block w-fit bg-transparent focus:outline-none border-b border-zinc-50/10 text-right text-lg"
        {...register(`allocations.${idx}.percentage`, {
          setValueAs(value) {
            const num = Number(value);
            if (!isNaN(num)) {
              //limit to 2 digits saved in form context for submission
              return roundDownToNum(num, 2);
            } else {
              return 0;
            }
          },
        })}
      />
      {/* <button type="button" onClick={() => remove(idx)} tabIndex={-1}>
        <Icon
          size={18}
          type="Close"
          className="text-rose-400 hover:text-rose-300 active:text-rose-500"
        />
      </button> */}
      <ErrorMessage
        name={`allocations.${idx}.percentage`}
        as="span"
        className="absolute right-4 -bottom-2 text-xs text-rose-300"
      />
    </Cells>
  );
}
