import { useCallback } from "react";
import { Charity, SubmitData } from "types/aws";
import { invalidateAwsTags } from "services/aws/aws";
import { useSubmitMutation } from "services/aws/registration";
import { adminTags, awsTags } from "services/aws/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setFormLoading, setStage } from "slices/transaction/transactionSlice";
import { logger } from "helpers";

export default function useSubmit() {
  const [submitApplication] = useSubmitMutation();
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
        dispatch(setFormLoading(true));

        const postData: SubmitData = {
          PK: charity.ContactPerson.PK!,
          chain_id: wallet!.chain.chain_id,
        };

        const response = await submitApplication(postData);

        dispatch(setFormLoading(false));

        if ("error" in response) {
          throw new Error("Request failed");
        }

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
    [dispatch, showModal, submitApplication, wallet]
  );

  return { submit, isSubmitting: form_loading };
}
