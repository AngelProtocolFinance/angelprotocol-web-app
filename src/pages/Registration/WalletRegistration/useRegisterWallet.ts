import { useCallback } from "react";
import {
  useRegistrationState,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";

export default function useRegisterWallet() {
  const { data } = useRegistrationState("");
  const charity = data!; //ensured by guard
  const [updateMetadata, { isSuccess, isLoading }] =
    useUpdateCharityMetadataMutation();
  const { handleError } = useErrorContext();

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      const result = await updateMetadata({
        body: { JunoWallet: walletAddress },
        PK: charity.ContactPerson.PK,
      });

      if ("error" in result) {
        handleError(result.error, "Error updating wallet ❌");
      }
    },
    [charity, handleError, updateMetadata]
  );

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
