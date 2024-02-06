import Icon from "components/Icon/Icon";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { humanize } from "helpers";
import { useEffect, useState } from "react";
import { EstimateStatus, SimulInput, isSuccess } from "../types";
import { estimateDonation } from "./estimateDonation";

type Props = {
  classes?: string;
  simulInput?: SimulInput;
};
export default function TxSubmit({ simulInput, classes = "" }: Props) {
  const [estimate, setEstimate] = useState<EstimateStatus>();

  useEffect(() => {
    if (!simulInput) return setEstimate(undefined);
    setEstimate("loading");
    estimateDonation(simulInput).then((estimate) => setEstimate(estimate));
  }, [simulInput]);

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
        className="btn-orange"
        disabled={!simulInput || !estimate || !isSuccess(estimate)}
      >
        Continue
      </button>
    </div>
  );
}
