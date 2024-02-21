import { maskAddress } from "helpers";
import { Props } from "../types";

export default function Tooltip(props: Props) {
  return (
    <p className={props.classes ?? ""}>
      <span className="text-xs uppercase font-bold mb-1">Transaction ID:</span>
      <span className="font-normal text-sm ml-2">
        {maskAddress(props.txHash)}
      </span>
    </p>
  );
}
