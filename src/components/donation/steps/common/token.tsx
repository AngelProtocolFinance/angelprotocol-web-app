import { humanize, ru_vdec } from "helpers/decimal";

export const token = (usd_per_unit: number, decimals: number) =>
  function Amount(props: { amount: string | number; classes?: string }) {
    return (
      <dd className={props.classes}>
        {ru_vdec(+props.amount, usd_per_unit, decimals)}{" "}
        {`($${humanize(+props.amount * usd_per_unit, 2)})`}
      </dd>
    );
  };
