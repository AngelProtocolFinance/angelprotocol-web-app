import { DONATION_INCREMENTS } from "constants/common";
import { centsDecimals, humanize } from "helpers";

export type OnIncrement = (increment: number) => void;

interface Props {
  rate: number;
  precision?: number;
  code: string;
  onIncrement: OnIncrement;
  increments?: number[];
  classes?: string;
}

export default function Incrementers({
  increments = DONATION_INCREMENTS,
  classes = "",
  ...props
}: Props) {
  return (
    <div className={`flex justify-center flex-wrap gap-3 ${classes}`}>
      {increments
        .toSorted((a, b) => a - b)
        .map((inc) => (
          <Incrementer key={inc} inc={inc} {...props} />
        ))}
    </div>
  );
}

interface IIncrementer extends Props {
  inc: number;
}

function Incrementer({
  rate,
  inc,
  code,
  onIncrement,
  precision = 2,
}: IIncrementer) {
  const value = rate * inc;
  return (
    <button
      data-testid="incrementer"
      type="button"
      className="text-sm font-medium border border-gray-l4 hover:border-gray-l3 rounded-full p-3"
      onClick={() => onIncrement(value)}
    >
      +{shortenHumanize(value, rate, precision)} {code.toUpperCase()}
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
