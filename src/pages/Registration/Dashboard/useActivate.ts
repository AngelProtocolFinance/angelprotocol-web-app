import { useCallback } from "react";
import { useActivateCharityMutation } from "services/aws/registration";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../store";

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useActivate() {
  const [activateCharity, { isLoading }] = useActivateCharityMutation();
  const { showModal } = useModalContext();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();

  const activate = useCallback(
    async (primaryKey?: string) => {
      const result = await activateCharity(primaryKey);

      if ("error" in result) {
        console.log(result.error);
        showModal(Popup, { message: FORM_ERROR });
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
    [charity, activateCharity, dispatch, showModal]
  );

  return { activate, isSubmitting: isLoading };
}
