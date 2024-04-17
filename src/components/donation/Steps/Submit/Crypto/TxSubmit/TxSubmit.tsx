import Icon from "components/Icon/Icon";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { useErrorContext } from "contexts/ErrorContext";
import { humanize } from "helpers";
import { useEffect, useState } from "react";
import {
  useConfirmCryptoIntentMutation,
  useCreateCryptoIntentMutation,
} from "services/apes";
import { CryptoSubmitStep } from "slices/donation";
import { sendDonation } from "slices/donation/sendDonation";
import { useSetter } from "store/accessors";
import { CryptoDonation } from "types/aws";
import { ConnectedWallet } from "types/wallet";
import ContinueBtn from "../../../common/ContinueBtn";
import { EstimateStatus, isSuccess } from "../types";
import { estimateDonation } from "./estimateDonation";
import { txPackage } from "./txPackage";

type Props = {
  classes?: string;
  donation: CryptoSubmitStep;
  wallet?: ConnectedWallet;
};
export default function TxSubmit({ wallet, donation, classes = "" }: Props) {
  const dispatch = useSetter();
  const [estimate, setEstimate] = useState<EstimateStatus>();
  const [transactionId, setTransactionId] = useState<string>();

  const { handleError } = useErrorContext();

  const { details, recipient, liquidSplitPct, tip = 0, donor } = donation;
  const chain = chains[details.chainId.value];
  const sender = wallet?.address;
  useEffect(() => {
    if (!sender) return setEstimate(undefined);
    setEstimate("loading");
    estimateDonation(details.token, details.chainId.value, sender).then(
      (estimate) => setEstimate(estimate)
    );
  }, [sender, details]);

  const [createCryptoIntent] = useCreateCryptoIntentMutation();
  const [confirmCryptoIntent] = useConfirmCryptoIntentMutation();

  useEffect(() => {
    (async () => {
      try {
        if (!wallet?.address) {
          return;
        }

        const payload: CryptoDonation = {
          amount: +details.token.amount,
          tipAmount: tip,
          chainId: chain.id,
          chainName: chain.name,
          denomination: details.token.symbol,
          splitLiq: liquidSplitPct,
          walletAddress: wallet.address,
          endowmentId: recipient.id,
          source: details.source,
          donor,
        };
        const id = await createCryptoIntent(payload).unwrap();
        setTransactionId(id);
      } catch (err) {
        handleError(err);
      }
    })();
  }, [
    details.token.amount,
    details.token.symbol,
    details.source,
    recipient.id,
    liquidSplitPct,
    chain.id,
    chain.name,
    tip,
    donor,
    wallet?.address,
    createCryptoIntent,
    handleError,
  ]);

  return (
    <div className={`${classes} grid w-full gap-y-2`}>
      {/** estimate tooltip */}
      {estimate &&
        (estimate === "loading" ? (
          <LoadingStatus classes="text-sm text-navy-l1">
            Simulating tx..
          </LoadingStatus>
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
          wallet && transactionId && estimate && isSuccess(estimate)
            ? () => {
                const action = sendDonation({
                  onSuccess: (txHash) =>
                    confirmCryptoIntent({
                      txHash,
                      txId: transactionId,
                    }).unwrap(),
                  ...txPackage(estimate, wallet),
                });
                dispatch(action);
              }
            : undefined
        }
        disabled={
          !transactionId || !wallet || !estimate || !isSuccess(estimate)
        }
      />
    </div>
  );
}
