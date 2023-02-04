import { useUpdateRegMutation } from "services/aws/registration";
import useErrorHandler from "hooks/useErrorHandler";
import { useRegState } from "../StepGuard";

export default function useRegisterWallet() {
  const { handleError } = useErrorHandler();
  const { data: state } = useRegState<3>();
  const [updateReg, { isSuccess, isLoading }] = useUpdateRegMutation();

  const registerWallet = async (address: string) => {
    await updateReg({
      type: "wallet",
      reference: state.init.reference,
      JunoWallet: address,
    })
      .unwrap()
      .catch(handleError);
  };

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
