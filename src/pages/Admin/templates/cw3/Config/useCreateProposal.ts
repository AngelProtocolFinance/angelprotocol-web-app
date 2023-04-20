import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { MultisigConfig } from "services/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";

type Key = keyof FV;
type Value = FV[Key];

export default function usePropose() {
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function createProposal({
    title,
    description,
    initial,
    threshold,
    requireExecution,
  }: FV) {
    const config: MultisigConfig = {
      threshold: +threshold,
      requireExecution,
    };
    const diff = getPayloadDiff(initial, config);
    const diffEntries = Object.entries(diff) as [Key, Value][];

    if (diffEntries.length <= 0) {
      return showModal(Prompt, {
        type: "error",
        title: "Create Proposal",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    if (!wallet) {
      return showModal(Prompt, {
        type: "error",
        children: "Wallet is not connected",
      });
    }

    // const contract = new CW3(wallet, multisig);

    const [data, dest] = encodeTx("multisig.change-threshold", {
      multisig,
      threshold: +threshold,
    });

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title,
      description,
      destination: dest,
      value: "0",
      data,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw3_config"),
    });
  }

  return {
    createProposal: handleSubmit(createProposal),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
