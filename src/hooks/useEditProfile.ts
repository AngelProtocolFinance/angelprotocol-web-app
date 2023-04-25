import { toUtf8 } from "@cosmjs/encoding";
import { hexlify } from "@ethersproject/bytes";
import { EndowmentProfileUpdate } from "types/aws";
import { ProviderId } from "types/lists";
import { SemiPartial } from "types/utils";
import { useAdminResources } from "pages/Admin/Guard";
import { useEditProfileMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { getProvider } from "helpers";
import { cleanObject } from "helpers/cleanObject";
import { appRoutes } from "constants/routes";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { propMeta } = useAdminResources<"charity">();

  const { showModal } = useModalContext();
  const { wallet } = useGetWallet();
  const [submit] = useEditProfileMutation();

  const editProfile = async (
    endowProfileUpdate: SemiPartial<EndowmentProfileUpdate, "id" | "owner">
  ) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useTxSender
       */
      if (!wallet) {
        return showModal(TxPrompt, {
          error: "You need to connect your wallet to make this transaction.",
        });
      }

      if (!isEVM(wallet.providerId)) {
        return showModal(TxPrompt, {
          error: "Please connect an EVM compatible wallet",
        });
      }

      if (!propMeta.isAuthorized) {
        return showModal(TxPrompt, {
          error: "You are not authorized to make this transaction.",
        });
      }

      const cleanUpdates = cleanObject(endowProfileUpdate);

      showModal(
        TxPrompt,
        { loading: "Signing changes.." },
        { isDismissible: false }
      );

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

  return editProfile;
}

function isEVM(id: ProviderId) {
  switch (id) {
    case "binance-wallet":
    case "evm-wc":
    case "metamask":
    case "xdefi-evm":
    case "web3auth-torus":
      return true;
    default:
      return false;
  }
}
