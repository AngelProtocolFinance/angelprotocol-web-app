import { useCallback } from "react";
import useHandleError from "pages/Registration/useHandleError";
import {
  useRegistrationState,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";

export default function useRegisterWallet() {
  const { data } = useRegistrationState("old");
  const charity = data!; //ensured by guard
  const [updateMetadata, { isSuccess, isLoading }] =
    useUpdateCharityMetadataMutation();
  const handleError = useHandleError();

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      const result = await updateMetadata({
        body: { TerraWallet: walletAddress },
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
