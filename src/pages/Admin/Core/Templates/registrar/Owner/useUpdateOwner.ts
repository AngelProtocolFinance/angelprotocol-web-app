import { useFormContext } from "react-hook-form";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";

export default function useUpdateOwner() {
  const { multisig, propMeta, getWallet } = useAdminResources();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarOwnerValues>();

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function updateOwner(rv: RegistrarOwnerValues) {
    //check for changes
    if (rv.initialOwner === rv.new_owner) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Owner",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const [data, dest] = encodeTx("registrar.update-owner", {
      newOwner: rv.new_owner,
    });

    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.submit-transaction", {
          multisig,
          title: rv.title,
          description: rv.description,
          destination: dest,
          value: "0",
          data,
        }),
      },
      ...propMeta,
    });
  }

  return {
    updateOwner: handleSubmit(updateOwner),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
