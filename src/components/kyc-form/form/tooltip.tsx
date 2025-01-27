import { maskAddress } from "helpers";

interface ITooltip {
  txId: string;
  classes?: string;
}
export function Tooltip({ txId, classes = "" }: ITooltip) {
  return (
    <p className={classes}>
      <span className="text-xs uppercase font-bold mb-1">Transaction ID:</span>
      <span className="font-normal text-sm ml-2">{maskAddress(txId)}</span>
    </p>
  );
}
