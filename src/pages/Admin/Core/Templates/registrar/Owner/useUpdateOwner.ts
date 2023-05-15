import { useFormContext } from "react-hook-form";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isPolygonChain } from "helpers/isPolygonChain";

export default function useUpdateOwner() {
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
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

    if (!wallet) {
      return showModal(Prompt, {
        type: "error",
        children: "Wallet is not connected",
      });
    }

    if (!isPolygonChain(wallet.chain.chain_id)) {
      return showModal(Prompt, {
        type: "error",
        children: "Please connect to the Polygon Network",
      });
    }

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
