import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";

export default function useConfigureRegistrar() {
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function configureRegistrar({
    title,
    description,
    initial,
    ...fv //registrarConfig
  }: FV) {
    //check for changes
    const diff = getPayloadDiff(initial, fv);
    if (isEmpty(diff)) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Registrar",
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

    const [data, dest, meta] = encodeTx(
      "registrar.update-config",
      {
        ...initial,
        ...fv,
      },
      diff
    );

    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.submit-transaction", {
          multisig,
          title,
          description,
          destination: dest,
          value: "0",
          data,
          meta: meta.encoded,
        }),
      },
      ...propMeta,
    });
  }

  return {
    configureRegistrar: handleSubmit(configureRegistrar),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
