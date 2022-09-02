import {
  useRegistrationQuery,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { GENERIC_ERROR_MESSAGE } from "../constants";
import { Wallet } from "./WalletSubmission";

export default function useRegisterWallet() {
  const { charity } = useRegistrationQuery();
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
      handleError(err, GENERIC_ERROR_MESSAGE);
    }
  };

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
