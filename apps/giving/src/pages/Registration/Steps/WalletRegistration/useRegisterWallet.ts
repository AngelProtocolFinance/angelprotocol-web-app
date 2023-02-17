import { useUpdateRegMutation } from "@/services/aws/registration";
import { GENERIC_ERROR_MESSAGE } from "@ap/constants";
import { useErrorContext } from "@ap/contexts";
import { useRegState } from "../StepGuard";

export default function useRegisterWallet() {
  const { handleError } = useErrorContext();
  const { data: state } = useRegState<3>();
  const [updateReg, { isSuccess, isLoading }] = useUpdateRegMutation();

  const registerWallet = async (address: string) => {
    try {
      const result = await updateReg({
        type: "wallet",
        reference: state.init.reference,
        JunoWallet: address,
      });

      if ("error" in result) {
        handleError(result.error, "Error updating wallet ❌");
      }
    } catch (err) {
      handleError(err, GENERIC_ERROR_MESSAGE);
    }
  };

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
