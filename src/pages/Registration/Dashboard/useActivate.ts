import { useCallback } from "react";
import { useActivateCharityMutation } from "services/aws/registration";
import { FORM_ERROR } from "../constants";
import useHandleError from "../useHandleError";

export default function useActivate() {
  const [activateCharity, { isLoading }] = useActivateCharityMutation();
  const handleError = useHandleError();

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
