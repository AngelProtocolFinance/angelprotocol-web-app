import { useUpdateRegMutation } from "services/aws/registration";
import { useRegState } from "services/aws/registration/StepGuard";
import { useErrorContext } from "contexts/ErrorContext";
import { GENERIC_ERROR_MESSAGE } from "../../constants";
import { Wallet } from "./WalletSubmission";

export default function useRegisterWallet() {
  const { handleError } = useErrorContext();
  const { data: state } = useRegState<4>();
  const [updateReg, { isSuccess, isLoading }] = useUpdateRegMutation();

  const registerWallet = async (data: Wallet) => {
    try {
      const result = await updateReg({
        type: "wallet",
        reference: state.init.reference,
        JunoWallet: data.address,
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
