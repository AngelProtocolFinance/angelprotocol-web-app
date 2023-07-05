import { isTooltip, useAdminContext } from "pages/Admin/Context";
import { useApplicationQuery } from "services/juno/custom";
import { ErrorStatus, Info, LoadingStatus } from "components/Status";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads, hasElapsed } from "helpers/admin";

export default function Proposal({ txId }: { txId: number }) {
  const { txResource, config } = useAdminContext();
  const sendTx = useTxSender();

  const { data, isLoading, isError } = useApplicationQuery({
    id: txId,
    user: !isTooltip(txResource) ? txResource.wallet.address : undefined,
  });

  if (isLoading) {
    return <LoadingStatus>Loading proposal...</LoadingStatus>;
  }

  if (!data || isError) {
    return <ErrorStatus>Failed to get proposal info</ErrorStatus>;
  }

  if (isTooltip(txResource)) {
    return <Info>{txResource}</Info>;
  }

  const { expiry, executed, confirmations, userConfirmed } = data;
  if (hasElapsed(expiry) && !executed) {
    return <ErrorStatus>Proposal expired</ErrorStatus>;
  }

  if (userConfirmed) {
    return <Info>You approved this transaction.</Info>;
  }

  if (executed) {
    return <Info>Proposal is executed</Info>;
  }

  // /////////////// NOT EXECUTED & NOT EXPIRED /////////////////////////////

  const { wallet } = txResource;
  const { threshold, requireExecution } = config;
  const passed = confirmations >= threshold;
  const willExecute = confirmations + 1 >= threshold && !requireExecution;

  const approve = async () => {
    await sendTx({
      content: {
        type: "evm",
        val: createTx(
          wallet.address,
          passed
            ? "multisig/review.execute-prop"
            : "multisig/review.confirm-prop",
          {
            id: 0,
          }
        ),
      },
      tagPayloads: getTagPayloads(
        passed ? "multisig/review.execute-prop" : "multisig/review.confirm-prop"
      ),
    });
  };

  return (
    <button
      type="button"
      className="min-w-[8rem] btn-orange px-2 py-1 text-sm"
      onClick={approve}
    >
      {passed ? "Execute" : willExecute ? "Approve and execute" : "Approve"}
    </button>
  );
}
