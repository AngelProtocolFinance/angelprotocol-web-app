import { ProfileUpdateMsg, ProgramDeleteMsg } from "services/types";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { cleanObject } from "helpers/cleanObject";
import { appRoutes } from "constants/routes";

export function useUpdateEndowmentProfile() {
  const { showModal } = useModalContext();

  const updateProfile = async (msg: ProfileUpdateMsg | ProgramDeleteMsg) => {
    try {
      const cleanUpdates = cleanObject(msg);

      showModal(
        TxPrompt,
        { loading: "Signing changes.." },
        { isDismissible: false }
      );

      showModal(
        TxPrompt,
        { loading: "Submitting changes.." },
        { isDismissible: false }
      );

      alert("edit profile is WIP");

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

  return updateProfile;
}
