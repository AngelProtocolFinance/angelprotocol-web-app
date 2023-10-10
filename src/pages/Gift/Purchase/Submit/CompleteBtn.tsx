import { EstimateStatus } from "./types";
import { Estimate } from "types/tx";
import { WithWallet } from "contexts/WalletContext";
import { useSetter } from "store/accessors";
import { SubmitStep, setDetails } from "slices/gift";
import { purchase } from "slices/gift/purchase";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";

type Props = {
  estimate: EstimateStatus;
} & WithWallet<SubmitStep>;

export default function CompleteBtn({ estimate, ...props }: Props) {
  const { details, wallet } = props;
  const { token_id, amount, decimals, symbol } = details.token;
  const sendTx = useTxSender();

  const dispatch = useSetter();
  function submit({ tx }: Estimate) {
    dispatch(purchase({ wallet, tx, details: details }));
  }

  async function approve(token: string, amount: string, spender: string) {
    const tx = createTx(wallet.address, "erc20.approve", {
      erc20: token,
      spender,
      amount,
    });
    await sendTx({
      content: { type: "evm", val: tx },
    });
    //re-set details to render summary
    dispatch(setDetails(details));
  }

  if (estimate === "for-approval") {
    return (
      <button
        className="btn-orange btn-gift"
        type="button"
        onClick={() =>
          approve(
            token_id,
            scaleToStr(amount, decimals),
            "use-of-gc-contract-to-be-removed"
          )
        }
      >
        Approve {symbol}
      </button>
    );
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
