import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useEditEndowmentMutation } from "services/aws/aws";
import type { EndowmentUpdate } from "services/types";

export function useUpdateEndowment() {
  const { showModal } = useModalContext();
  const [submit] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();

  const updateEndowment = async (update: EndowmentUpdate) => {
    try {
      showModal(
        Prompt,

        { type: "loading", children: "Submitting changes.." },
        { isDismissible: false }
      );

      await submit(update).unwrap();

      return showModal(Prompt, {
        type: "success",
        children: "Successfully updated",
      });
    } catch (err) {
      handleError(err, { context: "applying changes" });
    }
  };

  return updateEndowment;
}
