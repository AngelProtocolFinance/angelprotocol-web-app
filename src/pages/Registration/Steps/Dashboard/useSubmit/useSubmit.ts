import { CompleteRegistration } from "services/types";
import { useSubmitMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { handleMutationResult } from "helpers";
import { chainIds } from "constants/chainIds";

export default function useSubmit() {
  const [submitApplication, { isLoading }] = useSubmitMutation();
  const { handleError } = useErrorContext();

  const submit = async ({ init }: CompleteRegistration) => {
    handleMutationResult(
      await submitApplication({
        ref: init.reference,
        chain_id: chainIds.juno,
      }),
      handleError
    );
  };

  return { submit, isSubmitting: isLoading };
}
