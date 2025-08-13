import type { IPayout } from "@better-giving/payouts";
import { mask_string } from "helpers/mask-string";
import type { ReactNode } from "react";

interface IDescription {
  id: string;
  text: string;
}
const Description = (props: IDescription) => {
  return (
    <p>
      {props.text}{" "}
      <span className="text-xs text-gray">{mask_string(props.id, 4)}</span>
    </p>
  );
};

/** pov: investments */
export const desc = (data: IPayout): ReactNode => {
  // always positive
  if (data.source === "donation") {
    return <Description text="Donation" id={data.source_id} />;
  }

  if (data.source === "liq") {
    return <Description text="Savings" id={data.source_id} />;
  }

  return <Description text="Investments" id={data.source_id} />;
};
