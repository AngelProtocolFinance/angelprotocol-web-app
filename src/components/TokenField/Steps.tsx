import Decimal from "decimal.js";
import { AmountOptionsProps } from "./types";
import { humanize, roundDownToNum } from "helpers";

export default function Steps({
  scale,
  token,
  onSetAmount,
}: AmountOptionsProps) {
  const base = token.min_donation_amnt || 100;
  const precision = new Decimal(token.min_donation_amnt).decimalPlaces();

  return (
    <div className="grid grid-cols-5 gap-2 text-xs">
      {scale.map((s) => {
        const step = roundDownToNum(s * base, precision);
        return (
          <button
            type="button"
            key={s}
            onClick={() => onSetAmount(step)}
            className={`${
              step === Number(token.amount)
                ? "bg-blue-l3 border-blue-l3 dark:bg-blue-d2 dark:border-blue-d2"
                : "bg-blue-l4 dark:bg-blue-d4 border-prim"
            }  rounded-full py-1.5 border`}
          >
            {step > token.balance ? "Max" : humanize(step, precision)}
          </button>
        );
      })}
    </div>
  );
}

/**
 * 
 * {steps.map((m) => {
        const precision = new Decimal(min).decimalPlaces();
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
                : "bg-blue-l4 dark:bg-blue-d4 border-prim"
            }  rounded-full py-1.5 border`}
          >
            {humanize(m, precision)}
          </button>
        );
      })}
 */
