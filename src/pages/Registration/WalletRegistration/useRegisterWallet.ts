import {
  useRegistrationState,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { FORM_ERROR } from "../constants";
import { Wallet } from "./WalletSubmission";

export default function useRegisterWallet() {
  const { charity } = useRegistrationState();
  const [updateMetadata, { isSuccess, isLoading }] =
    useUpdateCharityMetadataMutation();
  const { handleError } = useErrorContext();

  const registerWallet = async (data: Wallet) => {
    try {
      const result = await updateMetadata({
        body: { JunoWallet: data.address },
        PK: charity.ContactPerson.PK,
      });

      if ("error" in result) {
        handleError(result.error, "Error updating wallet ❌");
      }
    } catch (err) {
      handleError(err, FORM_ERROR);
    }
  };

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
