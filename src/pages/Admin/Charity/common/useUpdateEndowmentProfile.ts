import { TxPrompt } from "components/Prompt";
import { appRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { useEditProfileMutation } from "services/aws/aws";
import { ProfileUpdateMsg } from "services/types";

export function useUpdateEndowmentProfile() {
  const { showModal } = useModalContext();
  const [submit] = useEditProfileMutation();

  const updateProfile = async (msg: ProfileUpdateMsg) => {
    try {
      const cleanUpdates = cleanObject(msg);

      showModal(
        TxPrompt,
        { loading: "Submitting changes.." },
        { isDismissible: false }
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
