import { EncodeObject } from "@cosmjs/proto-signing";
import { useFormContext } from "react-hook-form";
import { ProposalMeta } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import CW3 from "contracts/CW3";
import SettingsController from "contracts/SettingsController";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import createUpdateEndowmentControllerMsg from "./createUpdateEndowmentControllerMsg";
import { FormValues } from "./schema";

export default function useSubmit() {
  const { id, cw3, propMeta } = useAdminResources<"charity">();
  const { handleError } = useErrorContext();
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useFormContext<FormValues>();
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();

  async function onSubmit({ initialValues, ...newValues }: FormValues) {
    try {
      const diff = getPayloadDiff(initialValues, newValues);

      if (isEmpty(Object.entries(diff))) {
        return handleError("No changes detected");
      }

      const settingsController = new SettingsController(wallet);
      const updateMsg = createUpdateEndowmentControllerMsg(id, diff);

      let msg: EncodeObject;

      // Unauthorized & non-delegated users wouldn't even be able to submit,
      // making it safe to assume they are either of those
      if (propMeta.isAuthorized) {
        const embeddedMsg =
          settingsController.createEmbeddedUpdateEndowmentControllerMsg(
            updateMsg
          );

        const meta: ProposalMeta = { type: "endow_controller" };

        const adminContract = new CW3(wallet, cw3);
        msg = adminContract.createProposalMsg(
          `Update permission settings for endowment id:${id}`,
          `Update permission settings for endowment id:${id} by member:${wallet?.address}`,
          [embeddedMsg],
          JSON.stringify(meta)
        );
      } else {
        msg = settingsController.createUpdateEndowmentControllerMsg(updateMsg);
      }

      await sendTx({
        msgs: [msg],
        ...propMeta,
        tagPayloads: getTagPayloads(propMeta.willExecute && "endow_controller"),
      });
    } catch (error) {
      handleError(error);
    }
  }

  return {
    isSubmitting,
    reset,
    submit: handleSubmit(onSubmit),
  };
}
