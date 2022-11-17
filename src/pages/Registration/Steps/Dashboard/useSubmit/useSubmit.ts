import { CompleteRegistration } from "services/aws/registration/types";
import { SubmitData } from "types/aws";
import { useSubmitMutation } from "services/aws/registration";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { useGetter } from "store/accessors";
import { logger } from "helpers";
import { chainIds } from "constants/chainIds";

export default function useSubmit() {
  const [submitApplication] = useSubmitMutation();
  const { form_loading } = useGetter((state) => state.transaction);
  const { showModal } = useModalContext();

  const submit = async ({ init }: CompleteRegistration) => {
    try {
      const postData: SubmitData = {
        PK: init.reference,
        chain_id: chainIds.juno, //applications are processed on Juno network
      };

      const response = await submitApplication(postData);

      if ("error" in response) {
        showModal(Popup, {
          message:
            "Registration submission failed. Contact support@angelprotocol.io",
        });
      }
    } catch (err) {
      logger.error(err);
      showModal(Popup, {
        message:
          "Registration submission failed. Contact support@angelprotocol.io",
      });
    }
  };

  return { submit, isSubmitting: form_loading };
}
