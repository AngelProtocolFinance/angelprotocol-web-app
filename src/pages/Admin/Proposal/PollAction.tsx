import React, { ReactNode } from "react";
import { ProposalDetails } from "services/types";
import { TagPayload } from "types/third-party/redux";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { isTooltip, useAdminContext } from "../Context";

export default function PollAction(props: ProposalDetails) {
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { multisig, config, txResource } = useAdminContext();

  const numSigned = props.signed.length;
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
          id: props.id,
        }),
      },
      tagPayloads: extractTagFromMeta(props.metadata),
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
          id: props.id,
        }),
      },
      tagPayloads: willExecute
        ? extractTagFromMeta(props.metadata)
        : [invalidateJunoTags(["multisig.votes"])],
    });
  }

  const EXED = props.status === "approved";
  //for execution
  const EX = props.status === "open" && numSigned >= config.threshold;
  //user signed
  const S = props.signed.some((s) => s === wallet?.address);

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <></>;
    //voting period ended and poll is passed waiting to be executed
  } else if (EX) {
    node = node = <Button onClick={executeProposal}>Execute Poll</Button>;
    //voting period ended, but poll is not passed
  } else {
    //voting ongoing
    if (S) {
      node = <Text>Signed</Text>;
    } else {
      node = (
        <Button onClick={sign}>
          {willExecute ? "Sign and execute" : "Sign"}
        </Button>
      );
    }
  }
  return <>{node}</>;
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="text-sm px-6 py-1.5 btn-orange" />;
}

function extractTagFromMeta(
  proposalMeta: ProposalDetails["metadata"]
): TagPayload[] {
  if (!proposalMeta) {
    return [invalidateJunoTags(defaultProposalTags)];
  }

  return getTagPayloads(proposalMeta.id);
}
