import { toUtf8 } from "@cosmjs/encoding";
import { hexlify } from "@ethersproject/bytes";
import { EndowmentProfileUpdate } from "types/aws";
import { SemiPartial } from "types/utils";
import { useEditProfileMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { getProvider } from "helpers";
import { cleanObject } from "helpers/cleanObject";
import { appRoutes } from "constants/routes";
import { useAdminResources } from "../../Context";

// import optimizeImage from "./optimizeImage";

export default function useUpdateEndowmentProfile() {
  const { checkSubmit } = useAdminResources<"charity">();

  const { showModal } = useModalContext();
  const [submit] = useEditProfileMutation();

  const updateProfile = async (
    endowProfileUpdate: SemiPartial<EndowmentProfileUpdate, "id" | "owner">
  ) => {
    try {
      const checkResult = checkSubmit(["name", "image", "logo", "sdgs"]);
      if (typeof checkResult === "function") return checkResult();

      const cleanUpdates = cleanObject(endowProfileUpdate);

      showModal(
        TxPrompt,
        { loading: "Signing changes.." },
        { isDismissible: false }
      );

      const { wallet } = checkResult;
      const provider = getProvider(wallet.providerId)!;

      const rawSignature = await provider.request<string>({
        method: "personal_sign",
        params: [hexlify(toUtf8(JSON.stringify(cleanUpdates))), wallet.address],
      });

      showModal(
        TxPrompt,
        { loading: "Submitting changes.." },
        { isDismissible: false }
      );

      const result = await submit({ unsignedMsg: cleanUpdates, rawSignature });
      if ("error" in result) {
        return showModal(TxPrompt, { error: "Failed to update profile" });
      }

      return showModal(TxPrompt, {
        success: {
          message: "Profile successfully updated",
          link: {
            description: "View changes",
            url: `${appRoutes.profile}/${cleanUpdates.id}`,
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
