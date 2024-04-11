import { TxPrompt } from "components/Prompt";
import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { useEditEndowmentMutation } from "services/aws/aws";
import { EndowmentUpdate } from "services/types";

export function useUpdateEndowment() {
  const { showModal } = useModalContext();
  const [submit] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();

  const updateEndowment = async (update: EndowmentUpdate) => {
    try {
      const cleanUpdates = cleanObject(update);

      showModal(
        TxPrompt,
        { loading: "Submitting changes.." },
        { isDismissible: false }
      );

      await submit(update).unwrap();

      return showModal(TxPrompt, {
        success: {
          message: "Successfully updated",
          link: {
            description: "View changes",
            url: `${appRoutes.marketplace}/${cleanUpdates.id}`,
          },
        },
      });
    } catch (err) {
      handleError(err, { context: "applying changes" });
    }
  };

  return updateEndowment;
}
