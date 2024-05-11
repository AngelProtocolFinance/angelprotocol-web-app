import Icon from "components/Icon/Icon";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { useDonationState } from "components/donation/Steps/Context";
import { humanize } from "helpers";
import { useEffect, useState } from "react";
import type { ConnectedWallet } from "types/wallet";
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

  const { details, tip } = donation;
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

  return (
    <div className={`${classes} grid w-full gap-y-2`}>
      {/** estimate tooltip */}
      {estimate === "loading" ? (
        <LoadingStatus classes="text-sm text-navy-l1">
          Simulating tx..
        </LoadingStatus>
      ) : estimate && isSuccess(estimate) ? (
        <p className="text-sm text-navy-l1 flex items-center gap-1">
          <Icon type="GasStation" className="text-base" />
          <span>
            {humanize(estimate.fee.amount, 6)} {estimate.fee.symbol}
          </span>
        </p>
      ) : (
        <ErrorStatus classes="text-sm">
          {estimate?.error || "An error occurred"}
        </ErrorStatus>
      )}

      <ContinueBtn
        type="button"
        onClick={
          wallet && estimate && isSuccess(estimate)
            ? () => submitCrypto(txPackage(estimate, wallet), donation)
            : undefined
        }
        disabled={!wallet || !estimate || !isSuccess(estimate)}
      />
    </div>
  );
}
