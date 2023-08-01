import React, { ReactNode } from "react";
import { TagPayload } from "types/third-party/redux";
import { Transaction } from "types/tx";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags, invalidateSubgraphTags } from "services/subgraph";
import { useGetWallet } from "contexts/WalletContext";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads, hasElapsed } from "helpers/admin";
import { isTooltip, useAdminContext } from "../Context";

export default function PollAction(props: Transaction) {
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { multisig, config, txResource } = useAdminContext();

  const numSigned = props.confirmations.length;
  const willExecute =
    numSigned + 1 >= config.threshold && !config.requireExecution;

  async function executeProposal() {
    if (isTooltip(txResource)) throw new Error(txResource);

    const { wallet } = txResource;
    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.execute-tx", {
          multisig,
          id: props.transactionId,
        }),
      },
      tagPayloads: extractTagFromMeta(props.meta),
    });
  }

  async function sign() {
    if (isTooltip(txResource)) throw new Error(txResource);

    const { wallet } = txResource;
    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.confirm-tx", {
          multisig,
          id: props.transactionId,
        }),
      },
      tagPayloads: willExecute
        ? extractTagFromMeta(props.meta)
        : [invalidateJunoTags(["multisig.votes"])],
    });
  }

  if (props.status === "approved" || hasElapsed(props.expiry)) return <></>;

  if (props.status === "open" && numSigned >= config.threshold) {
    return <Button onClick={executeProposal}>Execute Poll</Button>;
  }
  //vote is ongoing
  if (props.confirmations.some((s) => s === wallet?.address)) {
    return <Text>Signed</Text>;
  }

  return (
    <Button onClick={sign}>{willExecute ? "Sign and execute" : "Sign"}</Button>
  );
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="text-sm px-6 py-1.5 btn-orange" />;
}

function extractTagFromMeta(proposalMeta: Transaction["meta"]): TagPayload[] {
  if (!proposalMeta) {
    return [invalidateSubgraphTags(defaultProposalTags)];
  }

  return getTagPayloads(proposalMeta.id);
}
