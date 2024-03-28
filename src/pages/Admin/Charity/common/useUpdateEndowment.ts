import { TxPrompt } from "components/Prompt";
import { appRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { useEditEndowmentMutation } from "services/aws/aws";
import { EndowmentUpdate } from "services/types";

export function useUpdateEndowment() {
  const { showModal } = useModalContext();
  const [submit] = useEditEndowmentMutation();

  const updateEndowment = async (update: EndowmentUpdate) => {
    try {
      const cleanUpdates = cleanObject(update);

      showModal(
        TxPrompt,
        { loading: "Submitting changes.." },
        { isDismissible: false }
      );

      const result = await submit(update);

      if ("error" in result) {
        return showModal(TxPrompt, { error: "Failed to update Profile" });
      }

      return showModal(TxPrompt, {
        success: {
          message: "Profile successfully updated",
          link: {
            description: "View changes",
            url: `${appRoutes.marketplace}/${cleanUpdates.id}`,
          },
        },
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return updateEndowment;
}
