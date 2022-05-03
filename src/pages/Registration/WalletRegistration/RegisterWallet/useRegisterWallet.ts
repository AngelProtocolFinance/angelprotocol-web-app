import { useCallback } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../../store";

export default function useRegisterWallet() {
  const [updateMetadata, { isSuccess, isLoading }] =
    useUpdateCharityMetadataMutation();
  const dispatch = useSetter();
  const charity = useGetter((state) => state.charity);
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error) => {
      console.log(error);
      showModal(Popup, { message: "Error updating profile ❌" });
    },
    [showModal]
  );

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      const result = await updateMetadata({
        body: { TerraWallet: walletAddress },
        PK: charity.ContactPerson.PK,
      });

      if ("error" in result) {
        handleError(result.error);
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
