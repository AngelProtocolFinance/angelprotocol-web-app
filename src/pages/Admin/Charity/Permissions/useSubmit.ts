import { useFormContext } from "react-hook-form";
import { ProposalMeta } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import CW3 from "contracts/CW3";
import SettingsController from "contracts/SettingsController";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import createUpdateEndowmentControllerMsg from "./createUpdateEndowmentControllerMsg";
import { FormValues } from "./schema";

export default function useSubmit() {
  const { id, cw3, propMeta, endow_type } = useAdminResources<"charity">();
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
      const msg = createUpdateEndowmentControllerMsg(id, diff);
      const embeddedMsg =
        settingsController.createEmbeddedUpdateEndowmentControllerMsg(msg);

      const meta: ProposalMeta = { type: "endow_controller" };

      const adminContract = new CW3(wallet, cw3);
      const proposalMsg = adminContract.createProposalMsg(
        "Update permission settings",
        `Update permission settings for endowment id:${id}`,
        [embeddedMsg],
        JSON.stringify(meta)
      );

      await sendTx({
        msgs: [proposalMsg],
        ...propMeta,
      });
    } catch (error) {
      handleError(error);
    }
  }

  return {
    disabled: isSubmitting || endow_type === "charity",
    reset,
    submit: handleSubmit(onSubmit),
  };
}
