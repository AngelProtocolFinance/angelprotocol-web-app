import { ErrorMessage } from "@hookform/error-message";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import Icon from "components/Icon";
import { roundDownToNum } from "helpers";

type Props = {
  name: string;
  idx: number;
  remove: UseFieldArrayRemove;
};

export const FIELD_PRECISION = 6;
export default function Field({ name, idx, remove }: Props) {
  const { register } = useFormContext<FormValues>();
  return (
    <div className="grid grid-cols-2 p-3 rounded-md border border-zinc-50/30 gap-x-4 relative">
      <button
        tabIndex={-1}
        onClick={() => remove(idx)}
        type="button"
        className="grid place-items-center rounded-full w-5 h-5 bg-rose-400 text-white absolute top-2 right-2"
      >
        <Icon type="Minus" size={11} />
      </button>
      <h5 className="col-span-2 text-sm mb-2">Vault Investment Ticket</h5>
      <p className="p-3 rounded-md bg-zinc-50/5 shadow-inner">{name}</p>
      <div className="relative w-full">
        <input
          placeholder="0.0000"
          className="w-full bg-zinc-50/5 shadow-inner p-3 focus:outline-none text-lg"
          {...register(`investments.${idx}.amount`, {
            setValueAs(value) {
              const num = Number(value);
              if (!isNaN(num)) {
                return roundDownToNum(num, FIELD_PRECISION);
              } else {
                return 0;
              }
            },
          })}
        />
        <ErrorMessage
          name={`investments.${idx}.amount`}
          as="span"
          className="absolute right-1 bottom-1 text-xs text-rose-300"
        />
      </div>
    </div>
  );
}
