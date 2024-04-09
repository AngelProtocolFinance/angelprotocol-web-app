import { SubmitStep } from "slices/gift";
import { EstimateResult } from "types/tx";
import { EstimateStatus } from "./types";

type Props = {
  estimate: EstimateStatus;
} & SubmitStep;

export default function CompleteBtn({ estimate }: Props) {
  return (
    <button
      className="btn-blue btn-gift"
      disabled={!isEstimated(estimate)}
      type="button"
    >
      Complete
    </button>
  );
}

const isEstimated = (val: EstimateStatus): val is EstimateResult =>
  !(val === "error" || val === "loading");
