import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt, { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getPayloadDiff } from "helpers/admin";
import { isPolygonChain } from "helpers/isPolygonChain";

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

    const diffEntries = Object.entries(diff);
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

    if (!isPolygonChain(wallet.chain.chain_id)) {
      return showModal(TxPrompt, {
        error: "Please connect on Polygon Network",
      });
    }

    const [configData, dest] = encodeTx("index-fund.config", data);

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title,
      description,
      destination: dest,
      value: "0",
      data: configData,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
    });
  }

  return {
    configureFund: handleSubmit(configureFund),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
