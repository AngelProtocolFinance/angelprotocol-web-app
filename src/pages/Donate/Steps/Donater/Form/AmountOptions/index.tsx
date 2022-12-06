import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import { humanize, roundDownToNum } from "helpers";

const STEPS = [0.1, 0.25, 0.5, 0.75, 1];
const PRECISION = 4;

export default function AmountOptions({ classes = "" }: { classes?: string }) {
  const { watch, setValue } = useFormContext<DonateValues>();
  const { balance, amount } = watch("token");

  return (
    <div className={`grid grid-cols-5 gap-2 text-xs ${classes}`}>
      {STEPS.map((s) => {
        const stepAmount = roundDownToNum(s * balance, PRECISION);

        return (
          <button
            type="button"
            key={s}
            onClick={() => {
              setValue("token.amount", humanize(stepAmount, PRECISION), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            className={`${
              stepAmount === Number(amount)
                ? "bg-blue-l3 border-blue-l3 dark:bg-blue-d2 dark:border-blue-d2"
                : "bg-blue-l4 dark:bg-blue-d4 border-gray-l2 dark:border-bluegray"
            }  rounded-full py-1.5 border`}
          >
            {s * 100}%
          </button>
        );
      })}
    </div>
  );
}
