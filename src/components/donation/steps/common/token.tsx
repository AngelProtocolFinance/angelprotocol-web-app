import { humanize, round_to_cents } from "helpers/decimal";

export const token = (usdRate: number, decimals: number) =>
  function Amount(props: { amount: string | number; classes?: string }) {
    return (
      <dd className={props.classes}>
        {round_to_cents(+props.amount, usdRate, decimals)}{" "}
        {`($${humanize(+props.amount * usdRate, 2)})`}
      </dd>
    );
  };
