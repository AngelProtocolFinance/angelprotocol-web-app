import { DONATION_INCREMENTS } from "constants/common";
import { centsDecimals, humanize } from "helpers";
import type { Increment } from "types/widget";

export type OnIncrement = (increment: number) => void;

interface Props {
  rate: number;
  precision?: number;
  code: string;
  onIncrement: OnIncrement;
  increments?: Increment[];
  classes?: string;
}

export default function Incrementers({
  increments = DONATION_INCREMENTS,
  classes = "",
  ...props
}: Props) {
  return (
    <div className={` grid grid-cols-2 gap-2 ${classes}`}>
      {increments
        .toSorted((a, b) => a.value - b.value)
        .map((inc) => (
          <Incrementer key={inc.value} inc={inc} {...props} />
        ))}
    </div>
  );
}

interface IIncrementer extends Props {
  inc: Increment;
}

function Incrementer({
  rate,
  inc,
  code,
  onIncrement,
  precision = 2,
}: IIncrementer) {
  const value = rate * inc.value;
  return (
    <button
      data-testid="incrementer"
      type="button"
      className="grid group/incrementer has-data-label:grid-rows-subgrid gap-y-1 row-span-2 rounded-lg p-2 bg-(--accent-primary)"
      onClick={() => onIncrement(value)}
    >
      <span className="text-left text-sm font-medium text-white group-active/incrementer:translate-x-1">
        +{shortenHumanize(value, rate, precision)} {code.toUpperCase()}
      </span>
      {inc.label && (
        <span data-label className="text-left text-xs text-white">
          {inc.label}
        </span>
      )}
    </button>
  );
}

/**
 * Humanize larger numbers, attempting to keep the numbers both readable and still
 * containing enough precision to be of use to the end user. Numbers passed through
 * should only have at most 5 digits in total (2 before the decimal, 3 digits after).
 */
function shortenHumanize(num: number, rate: number, precision = 2): string {
  const decimals = centsDecimals(rate, precision);
  if (num > 1e10) {
    // numbers over 10 Billion
    return `${humanize(num / 1e9, decimals)}B`;
  } else if (num > 1e7) {
    // numbers over 10 Million
    return `${humanize(num / 1e6, decimals)}M`;
  } else if (num > 1e4) {
    // numbers over 10 Thousand
    return `${humanize(num / 1e3, decimals)}K`;
  }
  // all other numbers under 10 Thousand
  return humanize(num, decimals);
}
