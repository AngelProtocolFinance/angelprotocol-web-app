import { ErrorMessage } from "@hookform/error-message";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { StrategyFormValues } from "../types";
import Icon from "components/Icon";
import { Cells } from "components/TableSection";
import { roundDownToNum } from "helpers";

type Props = {
  name: string;
  idx: number;
  remove: UseFieldArrayRemove;
  color: string;
  staticVal?: number;
};

export default function VaultField({
  name,
  idx,
  color,
  remove,
  staticVal,
}: Props) {
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

      {(staticVal && <p>{staticVal}</p>) || (
        <div className="relative w-full">
          <input
            className="w-full bg-transparent focus:outline-none text-lg"
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
          <ErrorMessage
            name={`allocations.${idx}.percentage`}
            as="span"
            className="absolute right-0 bottom-0 text-xs text-rose-300"
          />

          <button type="button" onClick={() => remove(idx)} tabIndex={-1}>
            <Icon
              size={18}
              type="Close"
              className="text-rose-400 hover:text-rose-300 active:text-rose-500 absolute right-0 top-1/2 transform -translate-y-1/2"
            />
          </button>
        </div>
      )}
    </Cells>
  );
}
