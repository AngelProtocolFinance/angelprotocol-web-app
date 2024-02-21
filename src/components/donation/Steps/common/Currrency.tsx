import { humanize } from "helpers";
import { Currency } from "types/components";

export function currency({ code, rate }: Currency) {
  const CODE = code.toUpperCase();
  return function Amount({
    classes = "",
    amount,
  }: { classes?: string; amount: string | number }) {
    return (
      <dd className={classes}>
        {CODE === "USD"
          ? `$${humanize(amount, 2)}`
          : rate
            ? `${CODE} ${humanize(amount, 2)} ($${humanize(+amount * rate, 2)})`
            : `${CODE} ${humanize(amount, 2)}`}
      </dd>
    );
  };
}
