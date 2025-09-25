import { humanize } from "helpers/decimal";
import type { DBCurrency } from "types/components";

type Props = { classes?: string; amount: string | number };
export function currency({ rate, code }: DBCurrency) {
  const CODE = code.toUpperCase();
  return function Amount({ classes = "", amount }: Props) {
    return (
      <dd className={`${classes} text-right`}>
        {CODE === "USD"
          ? `$${humanize(amount, 2)}`
          : rate
            ? `${CODE} ${humanize(amount, 2)} ($${humanize(
                +amount * (1 / rate),
                2
              )})`
            : `${CODE} ${humanize(amount, 2)}`}
      </dd>
    );
  };
}
