import { useCallback } from "react";
import { Charity } from "types/aws";
import { invalidateAwsTags } from "services/aws/aws";
import { adminTags, awsTags } from "services/aws/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transactionSlice";
import { createAuthToken, logger } from "helpers";
import { APIs } from "constants/urls";

export default function useSubmit() {
  const { wallet } = useGetWallet();
  const { form_loading } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const submit = useCallback(
    async (charity: Charity) => {
      try {
        dispatch(
          setStage({ step: "submit", message: "Saving endowment proposal" })
        );

        const generatedToken = createAuthToken("charity-owner");
        const response = await fetch(
          `${APIs.aws}/v2/registration/${charity.ContactPerson.PK!}/submit`,
          {
            method: "POST",
            body: JSON.stringify({ chain_id: wallet!.chain.chain_id }),
            headers: { authorization: generatedToken },
          }
        );

        dispatch(
          setStage({
            step: "success",
            message: "Endowment submitted for review",
            txHash: "",
            chainId: "",
          })
        );

        dispatch(
          invalidateAwsTags([
            { type: awsTags.admin, id: adminTags.registration },
          ])
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }
      } catch (err) {
        logger.error(err);
        dispatch(
          setStage({
            step: "error",
            message:
              "Failed to create endowment. Contact support@angelprotocol.io",
          })
        );
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [dispatch, showModal, wallet]
  );

  return { submit, isSubmitting: form_loading };
}
