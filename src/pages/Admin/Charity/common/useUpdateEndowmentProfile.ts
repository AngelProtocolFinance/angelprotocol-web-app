import { ProfileUpdateMsg, ProgramDeleteMsg } from "services/types";
import { useEditProfileMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { cleanObject } from "helpers/cleanObject";
import { appRoutes } from "constants/routes";

export function useUpdateEndowmentProfile() {
  const { showModal } = useModalContext();
  const [submit] = useEditProfileMutation();

  const updateProfile = async (msg: ProfileUpdateMsg | ProgramDeleteMsg) => {
    try {
      const cleanUpdates = cleanObject(msg);

      showModal(
        TxPrompt,
        { loading: "Submitting changes.." },
        { isDismissible: false },
      );

      const result = await submit(msg);

      if ("error" in result) {
        return showModal(TxPrompt, { error: "Failed to update profile" });
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

  return updateProfile;
}
