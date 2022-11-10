import { CompleteRegistration } from "services/aws/registration/types";
import { SubmitData } from "types/aws";
import { invalidateAwsTags } from "services/aws/aws";
import { useSubmitMutation } from "services/aws/registration";
import { adminTags, awsTags } from "services/aws/tags";
import { useModalContext } from "contexts/ModalContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transactionSlice";
import { logger } from "helpers";
import { chainIds } from "constants/chainIds";

export default function useSubmit() {
  const [submitApplication] = useSubmitMutation();
  const { form_loading } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const submit = async ({ init }: CompleteRegistration) => {
    try {
      dispatch(
        setStage({ step: "submit", message: "Saving endowment proposal" })
      );

      const postData: SubmitData = {
        PK: init.reference,
        chain_id: chainIds.juno, //applications are processed on Juno network
      };

      const response = await submitApplication(postData);

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
        invalidateAwsTags([{ type: awsTags.admin, id: adminTags.registration }])
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
  };

  return { submit, isSubmitting: form_loading };
}
