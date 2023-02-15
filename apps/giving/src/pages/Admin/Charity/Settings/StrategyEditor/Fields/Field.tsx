import { ErrorMessage } from "@hookform/error-message";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountType } from "types/contracts";
import Icon from "components/Icon";
import { roundDownToNum } from "helpers";
import { PCT_PRECISION } from "../constants";

type Props = {
  type: AccountType;
  name: string;
  idx: number;
  remove: UseFieldArrayRemove;
  staticVal?: number;
};

const inputStyle = "field-input bg-transparent text-center w-16 py-2";

export default function Field({ name, idx, remove, staticVal, type }: Props) {
  const { register } = useFormContext<FormValues>();
  return (
    <div className="px-6 py-7 grid grid-cols-[1fr_repeat(4,auto)] gap-3 items-center border border-prim rounded font-work bg-orange-l6 dark:bg-blue-d7">
      <p className="text-gray-d1 dark:text-gray mr-auto">{name}</p>

      <Icon type={type === "liquid" ? "Liquid" : "Lock"} />
      {staticVal ? (
        <input className={inputStyle} disabled={true} value={staticVal} />
      ) : (
        <div className="relative w-full">
          <input
            type="number"
            className={inputStyle + " text-field"}
            {...register(`allocations.${idx}.percentage`, {
              setValueAs(value) {
                const num = Number(value);
                if (!isNaN(num)) {
                  //limit to 2 digits saved in form context for submission
                  return roundDownToNum(num, PCT_PRECISION);
                } else {
                  return 0;
                }
              },
            })}
          />
          <ErrorMessage
            name={`allocations.${idx}.percentage`}
            as="span"
            className="field-error w-max"
          />
        </div>
      )}
      <span>%</span>
      <button
        disabled={!!staticVal}
        className="hover:text-red active:text-red-d1 disabled:text-gray"
        type="button"
        onClick={() => remove(idx)}
        tabIndex={-1}
      >
        <Icon size={16} type="Close" className="" />
      </button>
    </div>
  );
}
