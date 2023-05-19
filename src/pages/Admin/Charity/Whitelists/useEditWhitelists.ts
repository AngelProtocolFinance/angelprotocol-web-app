import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";

export default function useEditWhitelists() {
  const { id, propMeta, multisig, getWallet } = useAdminResources<"charity">();
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
      const wallet = getWallet();
      if (typeof wallet === "function") return wallet();

      const update: EndowmentSettingsUpdate = {
        ...initial,
        whitelistedBeneficiaries: contributors,
        whitelistedContributors: isEmpty(beneficiaries)
          ? [multisig]
          : beneficiaries,
      };

      const diff = getPayloadDiff(initial, update);

      if (Object.entries(diff).length <= 0) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      const [data, dest] = encodeTx("accounts.update-settings", update);
      let tx = createTx(wallet.address, "multisig.submit-transaction", {
        multisig,
        title: `Update whitelists settings`,
        description: `Update whitelists settings for endowment id:${id} by member:${wallet?.address}`,
        destination: dest,
        value: "0",
        data,
      });

      await sendTx({
        content: { type: "evm", val: tx },
        ...propMeta,
        isAuthorized: true,
        tagPayloads: getTagPayloads(propMeta.willExecute && "endow_controller"),
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
