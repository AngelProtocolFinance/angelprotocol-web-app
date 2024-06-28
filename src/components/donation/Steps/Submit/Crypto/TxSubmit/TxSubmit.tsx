import Icon from "components/Icon/Icon";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { humanize } from "helpers";
import { useEffect, useState } from "react";
import { useCreateCryptoIntentQuery } from "services/apes";
import { chainIdIsNotSupported } from "types/chain";
import type { ConnectedWallet } from "types/wallet";
import { useDonationState } from "../../../Context";
import ContinueBtn from "../../../common/ContinueBtn";
import { toDonor } from "../../../common/constants";
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

  const {
    details,
    tip,
    liquidSplitPct,
    donor: fvDonor,
    honorary,
    init,
  } = donation;
  const sender = wallet?.address;
  useEffect(() => {
    if (!sender) return setEstimate(undefined);

    const chainId = details.chainId;

    if (chainIdIsNotSupported(chainId)) {
      return setEstimate(undefined);
    }

    setEstimate("loading");

    estimateDonation(details.token, chainId, sender, tip?.value ?? 0).then(
      (estimate) => setEstimate(estimate)
    );
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
      //TODO: set this
      feeAllowance: 0,
      chainId: chains[details.chainId].id,
      chainName: chains[details.chainId].name,
      denomination: details.token.symbol,
      splitLiq: liquidSplitPct,
      walletAddress: wallet?.address ?? "",
      endowmentId: init.recipient.id,
      source: init.source,
      donor: toDonor(fvDonor),
      ...(honorary.honoraryFullName && {
        inHonorOf: honorary.honoraryFullName,
      }),
      ...(details.program.value && { programId: details.program.value }),
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
        onClick={
          intentId && wallet && estimate && isSuccess(estimate)
            ? () =>
                submitCrypto(txPackage(estimate, wallet), donation, intentId)
            : undefined
        }
        disabled={!intentId || !wallet || !estimate || !isSuccess(estimate)}
      />
    </div>
  );
}
