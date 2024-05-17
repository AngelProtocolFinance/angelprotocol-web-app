import Icon from "components/Icon/Icon";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { humanize } from "helpers";
import { useEffect, useState } from "react";
import { useCreateCryptoIntentQuery } from "services/apes";
import type { ConnectedWallet } from "types/wallet";
import { useDonationState } from "../../../Context";
import ContinueBtn from "../../../common/ContinueBtn";
import type { CryptoSubmitStep } from "../../../types";
import { type EstimateStatus, isSuccess } from "../types";
import { estimateDonation } from "./estimateDonation";
import { txPackage } from "./txPackage";

type Props = {
  classes?: string;
  donation: CryptoSubmitStep;
  wallet?: ConnectedWallet;
};
export default function TxSubmit({ wallet, donation, classes = "" }: Props) {
  const { submitCrypto } = useDonationState();
  const [estimate, setEstimate] = useState<EstimateStatus>();

  const { details, tip, liquidSplitPct, donor, init } = donation;
  const sender = wallet?.address;
  useEffect(() => {
    if (!sender) return setEstimate(undefined);
    setEstimate("loading");
    estimateDonation(
      details.token,
      details.chainId.value,
      sender,
      tip?.value ?? 0
    ).then((estimate) => setEstimate(estimate));
  }, [sender, details, tip]);

  const {
    data: intent,
    isError,
    isLoading,
  } = useCreateCryptoIntentQuery(
    {
      transactionId: init.intentId,
      amount: +details.token.amount,
      tipAmount: tip?.value ?? 0,
      chainId: chains[details.chainId.value].id,
      chainName: chains[details.chainId.value].name,
      denomination: details.token.symbol,
      splitLiq: liquidSplitPct,
      walletAddress: wallet?.address ?? "",
      endowmentId: init.recipient.id,
      source: init.widgetConfig ? "bg-widget" : "bg-marketplace",
      donor,
    },
    { skip: !wallet?.address }
  );

  // if oldTransactionId is present, we should be using and updating it;
  // otherwise, a new intent was created, so we should use its tx id.
  const intentId = init.intentId ?? intent?.transactionId;

  return (
    <div className={`${classes} grid w-full gap-y-2`}>
      {/** estimate tooltip */}
      {estimate &&
        (estimate === "loading" || isLoading ? (
          <LoadingStatus classes="text-sm text-navy-l1">
            Simulating tx..
          </LoadingStatus>
        ) : isError ? (
          <ErrorStatus classes="text-sm">An error occurred</ErrorStatus>
        ) : isSuccess(estimate) ? (
          <p className="text-sm text-navy-l1 flex items-center gap-1">
            <Icon type="GasStation" className="text-base" />
            <span>
              {humanize(estimate.fee.amount, 6)} {estimate.fee.symbol}
            </span>
          </p>
        ) : (
          <ErrorStatus classes="text-sm">{estimate.error}</ErrorStatus>
        ))}

      <ContinueBtn
        type="button"
        onClick={
          intentId && wallet && estimate && isSuccess(estimate)
            ? () => submitCrypto(txPackage(estimate, wallet), donation)
            : undefined
        }
        disabled={!intentId || !wallet || !estimate || !isSuccess(estimate)}
      />
    </div>
  );
}
