import { EstimateStatus } from "./types";
import { EstimateResult } from "types/tx";
import { SubmitStep } from "slices/gift";

type Props = {
  estimate: EstimateStatus;
} & SubmitStep;

export default function CompleteBtn({ estimate }: Props) {
  return (
    <button
      className="btn-orange btn-gift"
      disabled={!isEstimated(estimate)}
      type="button"
    >
      Complete
    </button>
  );
}

const isEstimated = (val: EstimateStatus): val is EstimateResult =>
  !(val === "error" || val === "loading");
