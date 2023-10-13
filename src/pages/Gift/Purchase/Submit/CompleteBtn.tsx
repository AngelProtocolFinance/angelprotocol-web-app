import { EstimateStatus } from "./types";
import { Estimate } from "types/tx";
import { WithWallet } from "types/wallet";
import { useSetter } from "store/accessors";
import { SubmitStep } from "slices/gift";
import { purchase } from "slices/gift/purchase";

type Props = {
  estimate: EstimateStatus;
} & WithWallet<SubmitStep>;

export default function CompleteBtn({ estimate, ...props }: Props) {
  const { details, wallet } = props;

  const dispatch = useSetter();
  function submit({ tx }: Estimate) {
    dispatch(purchase({ wallet, tx, details: details }));
  }

  return (
    <button
      className="btn-orange btn-gift"
      onClick={isEstimated(estimate) ? () => submit(estimate) : undefined}
      disabled={!isEstimated(estimate)}
      type="button"
    >
      Complete
    </button>
  );
}

const isEstimated = (val: EstimateStatus): val is Estimate =>
  !(val === "error" || val === "loading");
