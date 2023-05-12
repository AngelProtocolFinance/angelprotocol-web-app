import { useFormContext } from "react-hook-form";
import { Entries } from "type-fest";
import { FormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt, { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { genDiffMeta, getPayloadDiff, getTagPayloads } from "helpers/admin";

export default function useConfigureFund() {
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FormValues>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function configureFund({
    title,
    description,
    initial,
    ...data
  }: FormValues) {
    //check for changes
    const diff = getPayloadDiff(initial, data);

    const diffEntries = Object.entries(diff) as Entries<typeof data>;
    if (diffEntries.length <= 0) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Fund",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }

    const [configData, dest, meta] = encodeTx(
      "index-fund.config",
      data,
      genDiffMeta(diffEntries, data)
    );

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title,
      description,
      destination: dest,
      value: "0",
      data: configData,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "if_config"),
    });
  }

  return {
    configureFund: handleSubmit(configureFund),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
