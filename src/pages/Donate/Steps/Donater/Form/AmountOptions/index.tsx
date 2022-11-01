import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import { humanize } from "helpers";

const SCALE = [1, 2, 5, 10, 20];

export default function AmountOptions({ classes = "" }: { classes?: string }) {
  const { watch, setValue } = useFormContext<DonateValues>();
  const { min_donation_amnt, amount } = watch("token");

  const min = min_donation_amnt || 100;
  const steps = SCALE.map((s) => (min || 100) * s);

  return (
    <div className={`grid grid-cols-5 gap-2 text-xs ${classes}`}>
      {steps.map((m) => {
        const precision = min < 1 ? 3 : 0;
        return (
          <button
            type="button"
            key={m}
            onClick={() => {
              setValue("token.amount", humanize(m, precision), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            className={`${
              m === Number(amount)
                ? "bg-blue-l3 border-blue-l3 dark:bg-blue-d2 dark:border-blue-d2"
                : "bg-blue-l4 dark:bg-blue-d5 border-gray-l2 dark:border-bluegray"
            }  rounded-full py-1.5 border`}
          >
            {humanize(m, precision)}
          </button>
        );
      })}
    </div>
  );
}
