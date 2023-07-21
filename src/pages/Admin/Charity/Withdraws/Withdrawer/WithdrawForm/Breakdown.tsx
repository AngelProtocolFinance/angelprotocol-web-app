import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { chainIds } from "constants/chainIds";
import { denoms } from "constants/tokens";
import { bridgeFee } from "./helpers";

export default function Breakdown() {
  const { watch, getValues } = useFormContext<FV>();
  const bridgeFees = getValues("bridgeFees");
  const destinationChainId = watch("destinationChainId");
  const amounts = watch("amounts");
  const usdcAmountStr =
    amounts.find((a) => a.tokenId === denoms.dusd)?.value ?? "0";
  const usdcAmount = +usdcAmountStr;

  const prettyFee = bridgeFee(destinationChainId, bridgeFees);
  const toReceive = usdcAmount - prettyFee;

  /** only show breakdown:
   *  cross chain transfer
   *  USDC is to be withdrawn
   *  bridge fee is greater than withraw amount
   */
  if (
    destinationChainId === chainIds.polygon ||
    usdcAmount <= 0 ||
    toReceive < 0
  )
    return null;

  return (
    <div className="divide-y divide-prim">
      <p className="font-bold font-work mb-2">Summary</p>
      <Item title="amount" value={usdcAmount.toFixed(2) + " USDC"} />
      <Item title="bridge fee" value={prettyFee.toFixed(2) + " USDC"} />
      <Item title="to receive" value={toReceive.toFixed(2) + " USDC"} />
    </div>
  );
}

type Props = { title: string; value: string };
function Item({ title, value }: Props) {
  return (
    <div className="flex justify-between items-center w-full text-sm py-2 text-gray-d1 dark:text-gray">
      <span className="uppercase font-semibold text-xs">{title}:</span>
      <span>{value}</span>
    </div>
  );
}
