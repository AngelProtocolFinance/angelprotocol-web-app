import { useCallback } from "react";
import { useActivateCharityMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { FORM_ERROR } from "../constants";

export default function useActivate() {
  const [activateCharity, { isLoading }] = useActivateCharityMutation();
  const { handleError } = useErrorContext();

  const activate = useCallback(
    async (primaryKey?: string) => {
      const result = await activateCharity(primaryKey);

      if ("error" in result) {
        handleError(result.error, FORM_ERROR);
      }
    },
    [activateCharity, handleError]
  );

  return { activate, isSubmitting: isLoading };
}
