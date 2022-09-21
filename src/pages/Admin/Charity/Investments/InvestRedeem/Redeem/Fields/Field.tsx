import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountType } from "types/contracts";
import { roundDownToNum } from "helpers";

type Props = {
  type: AccountType;
  name: string;
  idx: number;
};

export const FIELD_PRECISION = 6;
export default function Field({ name, idx, type }: Props) {
  const { register } = useFormContext<FormValues>();
  return (
    <div className="grid grid-cols-2 p-3 rounded-md border border-zinc-50/30 gap-x-4 relative">
      <h5 className="col-span-2 text-sm mb-2">Vault Investment Ticket</h5>
      <p className="p-3 rounded-md bg-zinc-50/5 shadow-inner">{name}</p>
      <div className="relative w-full">
        <input
          className="w-full bg-zinc-50/5 shadow-inner p-3 focus:outline-none text-lg"
          {...register(`${type}.${idx}.amount`, {
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
          name={`${type}.${idx}.amount`}
          as="span"
          className="absolute right-1 bottom-1 text-xs text-rose-300"
        />
      </div>
    </div>
  );
}
