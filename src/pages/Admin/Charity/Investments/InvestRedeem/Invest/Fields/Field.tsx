import { ErrorMessage } from "@hookform/error-message";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import Icon from "components/Icon";
import { Cells } from "components/TableSection";
import { roundDownToNum } from "helpers";

type Props = {
  name: string;
  idx: number;
  remove: UseFieldArrayRemove;
};

export default function Field({ name, idx, remove }: Props) {
  const { register, getValues } = useFormContext<FormValues>();
  return (
    <div className="grid grid-cols-2">
      <h5 className="col-span-2">Vault investment ticket</h5>
      <p>{name}</p>
      <div className="relative w-full">
        <input
          className="w-full bg-transparent focus:outline-none text-lg"
          {...register(`investments.${idx}.amount`, {
            setValueAs(value) {
              const num = Number(value);
              if (!isNaN(num)) {
                //limit to 4 digits saved in form context for submission
                return roundDownToNum(num, 4);
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
    </div>
  );
}
