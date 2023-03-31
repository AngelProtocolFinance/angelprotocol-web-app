import { EncodeObject } from "@cosmjs/proto-signing";
import { useFormContext } from "react-hook-form";
import { ProposalMeta } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import CW3 from "contracts/CW3";
import SettingsController from "contracts/SettingsController";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import { UnexpectedStateError } from "errors/errors";
import createUpdateEndowmentControllerMsg from "./createUpdateEndowmentControllerMsg";
import { FormValues } from "./schema";
import useUserAuthorization from "./useUserAuthorization";

export default function useSubmit() {
  const {
    id,
    cw3,
    propMeta,
    settingsController: settings,
  } = useAdminResources<"charity">();
  const { handleError } = useErrorContext();
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useFormContext<FormValues>();
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { isUserOwner, userDelegated } = useUserAuthorization();

  async function onSubmit({
    initialValues,
    endowment_controller,
    ...newValues
  }: FormValues) {
    try {
      if (!endowment_controller.modifiableAfterInit) {
        throw new UnexpectedStateError(
          "Submitting unmodifiable controller changes"
        );
      }

      const diff = getPayloadDiff(initialValues, newValues);

      if (isEmpty(Object.entries(diff))) {
        return handleError("No changes detected");
      }

      const settingsController = new SettingsController(wallet);
      const updateMsg = createUpdateEndowmentControllerMsg(id, diff, settings);

      let msg: EncodeObject;

      // Unauthorized & non-delegated users wouldn't even be able to submit,
      // making it safe to assume they are either of those
      //
      // Users who are delegates for the whole controller can send direct update msg,
      // thus bypassing the need to create a proposal (even if they are a member of CW3 owners)
      if (userDelegated) {
        msg = settingsController.createUpdateEndowmentControllerMsg(updateMsg);
      } else {
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
      }

      await sendTx({
        content: { type: "cosmos", val: [msg] },
        ...propMeta,
        isAuthorized: userDelegated || isUserOwner,
        tagPayloads: getTagPayloads(propMeta.willExecute && "endow_controller"),
      });
    } catch (error) {
      handleError(error);
    }
  }

  return {
    errors,
    isSubmitting,
    reset: () => reset(),
    submit: handleSubmit(onSubmit),
  };
}
