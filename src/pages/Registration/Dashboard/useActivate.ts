import { useCallback } from "react";
import { useActivateCharityMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { GENERIC_ERROR_MESSAGE } from "../constants";

export default function useActivate() {
  const [activateCharity, { isLoading }] = useActivateCharityMutation();
  const { handleError } = useErrorContext();

  const activate = useCallback(
    async (primaryKey?: string) => {
      const result = await activateCharity(primaryKey);

      if ("error" in result) {
        handleError(result.error, GENERIC_ERROR_MESSAGE);
      }
    },
    [activateCharity, handleError]
  );

  return { activate, isSubmitting: isLoading };
}
