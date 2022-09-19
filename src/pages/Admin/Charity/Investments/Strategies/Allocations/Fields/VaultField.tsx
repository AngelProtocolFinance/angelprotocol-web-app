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
  const { register, getValues } = useFormContext<StrategyFormValues>();
  const isReadOnly = getValues("isReadOnly");
  return (
    <Cells
      type="td"
      cellClass="p-2 items-center relative text-zinc-50/80 font-heading"
    >
      <div className="flex items-center gap-2">
        <div
          className={`${color} w-5 h-5 rounded-full grid place-items-center`}
        >
          {!isReadOnly && !staticVal && (
            <button
              disabled={isReadOnly}
              type="button"
              onClick={() => remove(idx)}
              tabIndex={-1}
            >
              <Icon
                size={16}
                type="Close"
                className="hover:text-rose-600 text-zinc-600  active:text-zinc-700"
              />
            </button>
          )}
        </div>
        <span className="font-mono">{name}</span>
      </div>

      {(staticVal && <p>{staticVal}</p>) || (
        <div className="relative w-full">
          <input
            disabled={isReadOnly}
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
        </div>
      )}
    </Cells>
  );
}
