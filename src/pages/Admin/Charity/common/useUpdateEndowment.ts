import type { EndowUpdate } from "@better-giving/endowment";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useEditEndowmentMutation } from "services/aws/aws";

export function useUpdateEndowment() {
  const { showModal } = useModalContext();
  const [submit] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();

  const updateEndowment = async (update: EndowUpdate & { id: number }) => {
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
