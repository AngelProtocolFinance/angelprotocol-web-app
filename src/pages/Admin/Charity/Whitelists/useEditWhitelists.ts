import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";

export default function useEditWhitelists() {
  const { id, multisig, getWallet } = useAdminResources<"charity">();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  const editWhitelists: SubmitHandler<FormValues> = async ({
    initial,
    contributors,
    beneficiaries,
  }) => {
    try {
      const wallet = getWallet([
        "allowlistedBeneficiaries",
        "allowlistedContributors",
      ]);
      if (typeof wallet === "function") return wallet();

      const update: EndowmentSettingsUpdate = {
        ...initial,
        allowlistedBeneficiaries: isEmpty(beneficiaries)
          ? [multisig]
          : beneficiaries,
        allowlistedContributors: contributors,
      };

      const diff = getPayloadDiff(initial, update);

      if (isEmpty(diff)) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      const [data, dest, meta] = encodeTx(
        "accounts.update-settings",
        update,
        diff
      );
      const tx: SimulContractTx = wallet.isDelegated
        ? { from: wallet.address, to: dest, data }
        : createTx(wallet.address, "multisig.submit-transaction", {
            multisig,
            title: `Update whitelists settings`,
            description: `Update whitelists settings for endowment id:${id} by member:${wallet?.address}`,
            destination: dest,
            value: "0",
            data,
            meta: meta.encoded,
          });

      await sendTx({
        content: { type: "evm", val: tx },
        ...wallet.meta,
        tagPayloads: getTagPayloads(wallet.meta.willExecute && meta.id),
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return {
    reset,
    editWhitelists: handleSubmit(editWhitelists),
    isSubmitting,
  };
}
