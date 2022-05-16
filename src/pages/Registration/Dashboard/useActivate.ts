import { useCallback } from "react";
import { useActivateCharityMutation } from "services/aws/registration";
import { useGetter, useSetter } from "store/accessors";
import { FORM_ERROR } from "../constants";
import { updateCharity } from "../store";
import useHandleError from "../useHandleError";

export default function useActivate() {
  const [activateCharity, { isLoading }] = useActivateCharityMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();
  const handleError = useHandleError();

  const activate = useCallback(
    async (primaryKey?: string) => {
      const result = await activateCharity(primaryKey);

      if ("error" in result) {
        handleError(result.error, FORM_ERROR);
      } else {
        dispatch(
          updateCharity({
            ...charity,
            Registration: {
              ...charity.Registration,
              RegistrationStatus: "Active",
            },
          })
        );
      }
    },
    [charity, activateCharity, dispatch, handleError]
  );

  return { activate, isSubmitting: isLoading };
}
