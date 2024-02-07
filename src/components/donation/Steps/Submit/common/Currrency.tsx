import { humanize } from "helpers";
import { Currency as TCurrency } from "types/components";

type Props = TCurrency & { classes?: string; amount: string | number };
export default function Currency({ code, classes = "", amount, rate }: Props) {
  const CODE = code.toUpperCase();
  return (
    <dd className={classes}>
      {CODE === "USD"
        ? `$${humanize(amount, 2)}`
        : rate
          ? `${CODE} ${humanize(amount, 2)} ($${humanize(+amount * rate, 2)})`
          : `${CODE} ${humanize(amount, 2)}`}
    </dd>
  );
}
