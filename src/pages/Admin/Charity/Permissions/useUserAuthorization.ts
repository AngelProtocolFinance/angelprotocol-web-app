import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import { FormValues } from "./schema";

type Result = { userDelegated: boolean; isUserOwner: boolean };

export default function useUserAuthorization(): Result {
  const { wallet } = useGetWallet();
  const { propMeta } = useAdminResources();
  const { watch } = useFormContext<FormValues>();

  const endowment_controller = watch("endowment_controller");

  return {
    userDelegated:
      endowment_controller.delegated &&
      endowment_controller.delegate_address === wallet?.address,
    isUserOwner: endowment_controller.ownerControlled && propMeta.isAuthorized,
  };
}
