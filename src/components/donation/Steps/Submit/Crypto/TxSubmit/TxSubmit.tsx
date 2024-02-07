import Icon from "components/Icon/Icon";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { humanize } from "helpers";
import { useEffect, useState } from "react";
import { CryptoSubmitStep } from "slices/donation";
import { sendDonation } from "slices/donation/sendDonation";
import { useSetter } from "store/accessors";
import { ConnectedWallet } from "types/wallet";
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

  const { details } = donation;
  const sender = wallet?.address;
  useEffect(() => {
    if (!sender) return setEstimate(undefined);
    setEstimate("loading");
    estimateDonation(details.token, details.chainId.value, sender).then(
      (estimate) => setEstimate(estimate)
    );
  }, [sender, details]);

  return (
    <div className={classes + " grid w-full gap-y-2"}>
      {/** estimate tooltip */}
      {estimate &&
        (estimate === "loading" ? (
          <LoadingStatus classes="text-sm text-gray-d1">
            Simulating tx..
          </LoadingStatus>
        ) : isSuccess(estimate) ? (
          <p className="text-sm text-gray-d1 flex items-center gap-1">
            <Icon type="GasStation" className="text-base" />
            <span>
              {humanize(estimate.fee.amount, 6)} {estimate.fee.symbol}
            </span>
          </p>
        ) : (
          <ErrorStatus classes="text-sm">{estimate.error}</ErrorStatus>
        ))}

      <button
        type="button"
        onClick={
          wallet && estimate && isSuccess(estimate)
            ? () => {
                const action = sendDonation({
                  donation,
                  ...txPackage(estimate, wallet),
                });
                dispatch(action);
              }
            : undefined
        }
        className="btn-orange"
        disabled={!wallet || !estimate || !isSuccess(estimate)}
      >
        Continue
      </button>
    </div>
  );
}
