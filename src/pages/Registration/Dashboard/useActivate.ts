import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useActivateMutation } from "services/aws/registration";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../store";

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useActivate() {
  const [activateMutation, { isLoading }] = useActivateMutation();
  const { showModal } = useModalContext();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();

  const activate = useCallback(
    async (primaryKey?: string) => {
      const result = await activateMutation(primaryKey);

      const dataResult = result as {
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        console.log(dataResult.error);
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
    [charity, activateMutation, dispatch, showModal]
  );

  return { activate, isSubmitting: isLoading };
}
