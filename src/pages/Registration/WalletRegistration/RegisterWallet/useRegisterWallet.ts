import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useHandleError from "pages/Registration/useHandleError";
import {
  useRegistrationState,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import routes from "../routes";

export default function useRegisterWallet() {
  const [updateMetadata, { isLoading }] = useUpdateCharityMetadataMutation();
  const { data } = useRegistrationState("");
  const charity = data!; //ensured by guard
  const handleError = useHandleError();
  const navigate = useNavigate();

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      const result = await updateMetadata({
        body: { TerraWallet: walletAddress },
        PK: charity.ContactPerson.PK,
      });

      if ("error" in result) {
        handleError(result.error, "Error updating profile ❌");
      }

      navigate(`../${routes.success}`);
    },
    [charity, handleError, updateMetadata, navigate]
  );

  return {
    registerWallet,
    isSubmitting: isLoading,
  };
}
