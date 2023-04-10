import React, { ReactNode } from "react";
import { ProposalMeta } from "pages/Admin/types";
import { ProposalDetails } from "services/types";
import { TagPayload } from "types/third-party/redux";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { useAdminResources } from "../Guard";
import Voter from "./Voter";

export default function PollAction(props: ProposalDetails) {
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { multisig, propMeta } = useAdminResources();
  const { showModal } = useModalContext();

  async function executeProposal() {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }
    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.execute-tx", {
          multisig,
          id: props.id,
        }),
      },
      isAuthorized: propMeta.isAuthorized,
      tagPayloads: extractTagFromMeta(props.meta),
    });
  }

  const EXED = props.status === "executed";
  //for execution
  const EX = props.status === "pending" && props.signed.length >= 1;
  //user signed
  const S = props.signed.some((s) => s === wallet?.address);

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <Text>poll has ended</Text>;
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
        <Button
          onClick={() => {
            showModal(Voter, {
              type: "normal",
              proposalId: props.id,
              existingReason: props.description,
            });
          }}
        >
          Sign
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
  proposalMeta: ProposalDetails["meta"]
): TagPayload[] {
  if (!proposalMeta) {
    return [invalidateJunoTags(defaultProposalTags)];
  }
  const parsedProposalMeta: ProposalMeta = JSON.parse(proposalMeta);
  return getTagPayloads(parsedProposalMeta.type);
}
