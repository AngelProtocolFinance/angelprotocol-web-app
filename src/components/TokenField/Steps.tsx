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
  const steps = scale.map((s) => roundDownToNum(s * base, precision));

  //only show steps if balance is gte all steps
  if (token.balance < Math.max(...steps)) return null;

  return (
    <div className="grid grid-cols-5 gap-2 text-xs">
      {steps.map((step) => (
        <button
          type="button"
          key={step}
          onClick={() => onSetAmount(step)}
          className={`${
            step === Number(token.amount)
              ? "bg-blue-l3 border-blue-l3 dark:bg-blue-d2 dark:border-blue-d2"
              : "bg-blue-l4 dark:bg-blue-d4 border-gray-l3 dark:border-bluegray"
          }  rounded-full py-1.5 border`}
        >
          {humanize(step, precision)}
        </button>
      ))}
    </div>
  );
}
