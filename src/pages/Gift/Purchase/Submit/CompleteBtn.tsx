import { EstimateStatus } from "./types";
import { Estimate } from "types/tx";
import { useContractQuery } from "services/juno";
import { WithWallet } from "contexts/WalletContext";
import { useSetter } from "store/accessors";
import { SubmitStep } from "slices/gift";
import { purchase } from "slices/gift/purchase";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scale } from "helpers";
import { contracts } from "constants/contracts";

type Props = {
  estimate: EstimateStatus;
} & WithWallet<SubmitStep>;

export default function CompleteBtn({ estimate, ...props }: Props) {
  const { details, wallet } = props;
  const { token_id, type, amount, decimals, symbol } = details.token;
  const gc = contracts["gift-card"];
  const sendTx = useTxSender();

  const { data: allowance = "0", isLoading } = useContractQuery(
    "erc20.allowance",
    {
      erc20: token_id,
      owner: wallet.address,
      spender: gc,
    },
    type !== "erc20"
  );

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
    await sendTx({ content: { type: "evm", val: tx }, isAuthorized: true });
  }

  if (type === "erc20" && isLoading) {
    return (
      <button className="btn-orange btn-gift" disabled={true}>
        Checking allowance
      </button>
    );
  }

  const scaled = scale(amount, decimals);
  if (type === "erc20" && scaled.gt(allowance)) {
    return (
      <button
        className="btn-orange btn-gift"
        type="button"
        onClick={() => approve(token_id, scaled.toString(), gc)}
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
