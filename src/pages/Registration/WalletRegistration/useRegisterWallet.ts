import {
  useRegistrationState,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { WalletValues } from "./WalletSubmission";

export default function useRegisterWallet() {
  const { data } = useRegistrationState("");
  const charity = data!; //ensured by guard
  const [updateMetadata, { isSuccess, isLoading }] =
    useUpdateCharityMetadataMutation();

  const { handleError } = useErrorContext();

  const registerWallet = async (data: WalletValues) => {
    const result = await updateMetadata({
      body: { JunoWallet: data.address },
      PK: charity.ContactPerson.PK,
    });

    if ("error" in result) {
      handleError(result.error, "Error updating wallet ❌");
    }
  };

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
