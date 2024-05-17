import { humanize, roundDownToNum } from "helpers";
import { useFormContext } from "react-hook-form";
import type { Currency } from "types/components";
import type { FormValues } from "./types";

export default function Incrementers({
  rate,
  code,
}: { rate: number; code: string }) {
  console.log(code, rate);
  return (
    <div className="flex justify-center gap-3">
      <Incrementer value={40 * rate} curr={code} />
      <Incrementer value={100 * rate} curr={code} />
      <Incrementer value={200 * rate} curr={code} />
    </div>
  );
}

function Incrementer({ value, curr }: { value: number; curr: string }) {
  const roundedVal = roundDownToNum(value, 0);
  const { setValue, trigger, getValues } = useFormContext<FormValues>();
  return (
    <button
      type="button"
      className="text-sm font-medium border border-gray-l4 hover:border-gray-l3 rounded-full w-[7rem] h-10"
      onClick={() => {
        const amount = Number(getValues("amount"));
        if (Number.isNaN(amount)) {
          trigger("amount");
        } else {
          setValue("amount", `${amount + roundedVal}`);
        }
      }}
    >
      +{shortenHumanize(roundedVal)} {curr.toUpperCase()}
    </button>
  );
}

/**
 * Humanize larger numbers, attempting to keep the numbers both readable and still
 * containing enough precision to be of use to the end user. Numbers passed through
 * should only have at most 5 digits in total (2 before the decimal, 3 digits after).
 */
function shortenHumanize(num: number): string {
  if (num > 1e10) {
    // numbers over 10 Billion
    return `${humanize(num / 1e9, 3)}B`;
  } else if (num > 1e7) {
    // numbers over 10 Million
    return `${humanize(num / 1e6, 3)}M`;
  } else if (num > 1e4) {
    // numbers over 10 Thousand
    return `${humanize(num / 1e3, 3)}K`;
  }
  // all other numbers under 10 Thousand
  return `${num}`;
}
