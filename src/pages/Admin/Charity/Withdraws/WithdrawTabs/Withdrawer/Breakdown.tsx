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
    <div>
      <span>bridge fee: {prettyFee} USDC</span>
      <span>to receive amount: {toReceive} </span>
    </div>
  );
}
