import { EstimateStatus } from "./types";
import { Estimate } from "types/tx";
import { WithWallet } from "contexts/WalletContext";
import { useSetter } from "store/accessors";
import { SubmitStep } from "slices/gift";
import { purchase } from "slices/gift/purchase";

type Props = {
  estimate: EstimateStatus;
} & WithWallet<SubmitStep>;

export default function CompleteBtn({ estimate, ...props }: Props) {
  const dispatch = useSetter();
  function submit({ tx }: Estimate) {
    dispatch(purchase({ wallet: props.wallet, tx, details: props.details }));
  }

  return (
    <button
      className="btn-orange btn-gift"
      onClick={isEstimated(estimate) ? () => submit(estimate) : undefined}
      disabled={!isEstimated(estimate)}
      type="submit"
    >
      Complete
    </button>
  );
}

const isEstimated = (val: EstimateStatus): val is Estimate =>
  !(val === "error" || val === "loading");
