import { isTooltip, useAdminContext } from "pages/Admin/Context";
import { useApplicationProposalQuery } from "services/subgraph";
import { ErrorStatus, Info, LoadingStatus } from "components/Status";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads, hasElapsed } from "helpers/admin";

type Props = { classes?: string; txId: number };

export default function Proposal({ txId, classes = "" }: Props) {
  const { txResource, config } = useAdminContext();
  const sendTx = useTxSender();

  const { data, isLoading, isError } = useApplicationProposalQuery({
    applicationId: txId,
  });

  if (isLoading) {
    return <LoadingStatus classes={classes}>Loading proposal...</LoadingStatus>;
  }

  if (!data || isError) {
    return (
      <ErrorStatus classes={classes}>Failed to get proposal info</ErrorStatus>
    );
  }

  if (isTooltip(txResource)) {
    return <Info classes={classes}>{txResource}</Info>;
  }

  const { expiry, executed, confirmations } = data;

  const user = !isTooltip(txResource) ? txResource.wallet.address : undefined;
  const userConfirmed = confirmations.some((s) => s.owner.id === user);
  const numConfirmations = confirmations.length;

  if (hasElapsed(expiry) && !executed) {
    return <ErrorStatus classes={classes}>Proposal expired</ErrorStatus>;
  }

  if (userConfirmed && !executed) {
    return <Info classes={classes}>You approved this proposal.</Info>;
  }

  if (executed) {
    return <Info classes={classes}>Endowment is created</Info>;
  }

  // /////////////// NOT EXECUTED & NOT EXPIRED /////////////////////////////

  const { wallet } = txResource;
  const { threshold, requireExecution } = config;
  const passed = numConfirmations >= threshold;
  const willExecute = numConfirmations + 1 >= threshold && !requireExecution;

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
            id: txId,
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
      className={`${classes} min-w-[8rem] btn-orange p-2 text-sm justify-self-start`}
      onClick={approve}
    >
      {passed ? "Execute" : willExecute ? "Approve and execute" : "Approve"}
    </button>
  );
}
