import { useCallback } from "react";
import useHandleError from "pages/Registration/useHandleError";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../../store";

export default function useRegisterWallet() {
  const [updateMetadata, { isSuccess, isLoading }] =
    useUpdateCharityMetadataMutation();
  const dispatch = useSetter();
  const charity = useGetter((state) => state.charity);
  const handleError = useHandleError();

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      const result = await updateMetadata({
        body: { TerraWallet: walletAddress },
        PK: charity.ContactPerson.PK,
      });

      if ("error" in result) {
        handleError(result.error, "Error updating profile ❌");
      } else {
        dispatch(
          updateCharity({
            ...charity,
            Metadata: {
              ...charity.Metadata,
              TerraWallet: result.data.TerraWallet,
            },
          })
        );
      }
    },
    [charity, dispatch, handleError, updateMetadata]
  );

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
