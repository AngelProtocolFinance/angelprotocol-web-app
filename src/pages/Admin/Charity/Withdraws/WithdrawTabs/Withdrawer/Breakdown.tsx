import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { chainIds } from "constants/chainIds";
import { denoms } from "constants/tokens";
import { fee } from "./helpers";

export default function Breakdown() {
  const { watch, getValues } = useFormContext<WithdrawValues>();
  const fees = getValues("fees");
  const network = watch("network");
  const amounts = watch("amounts");
  const amount =
    amounts.find((a) => a.tokenId === denoms.axlusdc)?.value ?? "0";
  const usdc = +amount;

  const prettyFee = fee(network, fees);
  const toReceive = usdc - prettyFee;

  /** only show breakdown:
   *  cross chain transfer
   *  USDC is to be withdrawn
   *  bridge fee is greater than withraw amount
   */
  if (network === chainIds.juno || usdc <= 0 || toReceive < 0) return null;

  return (
    <div className="divide-y divide-gray-l2 dark:divide-bluegray-d1">
      <p className="uppercase font-bold font-heading mb-2 text-sm">Summary</p>
      <Item title="amount" value={usdc.toFixed(2) + " USDC"} />
      <Item title="bridge fee" value={prettyFee.toFixed(2) + " USDC"} />
      <Item title="to receive" value={toReceive.toFixed(2) + " USDC"} />
    </div>
  );
}

type Props = { title: string; value: string };
function Item({ title, value }: Props) {
  return (
    <div className="flex justify-between items-center w-full text-sm py-1 text-gray-d1 dark:text-gray">
      <span className="uppercase font-semibold text-xs">{title}:</span>
      <span>{value}</span>
    </div>
  );
}
