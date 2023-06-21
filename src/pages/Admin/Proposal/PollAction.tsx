import { AbiCoder } from "@ethersproject/abi";
import React, { ReactNode } from "react";
import { TxMeta } from "contracts/createTx/types";
import { ProposalDetails } from "services/types";
import { LogProcessor } from "types/evm";
import { TagPayload } from "types/third-party/redux";
import { TxOnSuccess } from "types/tx";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx } from "contracts/createTx/createTx";
import {
  ExecutionFailureEvent,
  multisig as Multisig,
} from "contracts/evm/multisig";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { EMPTY_DATA } from "constants/evm";
import { isTooltip, useAdminContext } from "../Context";

const ERROR = "error";
const processLog: LogProcessor = (logs) => {
  const topic = Multisig.getEventTopic(ExecutionFailureEvent);
  const log = logs.find((l) => l.topics.includes(topic));
  if (log) return ERROR;
};

export default function PollAction(props: ProposalDetails) {
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { multisig, config, txResource } = useAdminContext();
  const { showModal } = useModalContext();

  const numSigned = props.signed.length;
  const willExecute =
    numSigned + 1 >= config.threshold && !config.requireExecution;

  const onSuccess: TxOnSuccess = (result) => {
    const { data, ...okTx } = result;
    if (data === ERROR) {
      return showModal(TxPrompt, {
        error: "Some of transaction content failed to execute",
        tx: okTx,
      });
    }
    showModal(TxPrompt, {
      success: { message: "Transaction executed" },
      tx: okTx,
    });
  };

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
        log: processLog,
      },
      tagPayloads: extractTagFromMeta(props.metadata),
      onSuccess,
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
        log: willExecute ? processLog : undefined,
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
  if (proposalMeta === EMPTY_DATA) {
    return [invalidateJunoTags(defaultProposalTags)];
  }
  const parsed: TxMeta = JSON.parse(
    new AbiCoder().decode(["string"], proposalMeta)[0]
  );
  return getTagPayloads(parsed.id);
}
