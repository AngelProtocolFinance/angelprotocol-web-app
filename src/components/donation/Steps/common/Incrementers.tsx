import { DONATION_INCREMENTS } from "constants/common";
import { humanize, roundDownToNum } from "helpers";

export type OnIncrement = (increment: number) => void;

interface Props {
  rate: number;
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

function Incrementer({ rate, inc, code, onIncrement }: IIncrementer) {
  const value = rate * inc;
  const roundedVal = roundDownToNum(value, 0);
  return (
    <button
      data-testid="incrementer"
      type="button"
      className="text-sm font-medium border border-gray-l4 hover:border-gray-l3 rounded-full w-[7rem] h-10"
      onClick={() => onIncrement(roundedVal)}
    >
      +{shortenHumanize(roundedVal)} {code.toUpperCase()}
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
