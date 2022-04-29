import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useEffect } from "react";
import { useSubmitMutation } from "services/aws/registration";
import { SubmitResult } from "services/aws/types";
import {
  setFormError,
  setFormLoading,
  setStage,
} from "services/transaction/transactionSlice";
import { Stage, Step } from "services/transaction/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../../store";

type Result =
  | { data: SubmitResult }
  | { error: FetchBaseQueryError | SerializedError };

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useTransactionResultHandler() {
  const charity = useGetter((state) => state.charity);
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();

  const { showModal } = useModalContext();

  const [submitToAws] = useSubmitMutation();

  const handleError = useCallback(
    (err) => {
      console.log(err);
      showModal(Popup, { message: FORM_ERROR });
    },
    [showModal]
  );

  const handleSuccess = useCallback(
    (data: SubmitResult) =>
      dispatch(
        updateCharity({
          ...charity,
          Registration: {
            ...charity.Registration,
            RegistrationStatus: data.RegistrationStatus,
          },
          Metadata: {
            ...charity.Metadata,
            EndowmentContract: data.EndowmentContract,
          },
        })
      ),
    [dispatch, charity]
  );

  const handleResult = useCallback(
    (result: Result) => {
      const dataResult = result as {
        data: SubmitResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        handleError(dataResult.error);
      } else {
        handleSuccess(dataResult.data);
      }
    },
    [handleError, handleSuccess]
  );

  useEffect(() => {
    async function handle() {
      try {
        const result = await submitToAws({
          PK: charity.ContactPerson.PK!,
          EndowmentContract: getEndowmentContract(stage),
        });

        handleResult(result);
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(setStage({ step: Step.error, message: FORM_ERROR }));
      } finally {
        dispatch(setFormLoading(false));
      }
    }

    if (stage.step === Step.error) {
      console.log(stage.message);
      dispatch(setFormError(FORM_ERROR)); // also sets form_loading to 'false'
    } else if (stage.step === Step.success) {
      handle();
    }
  }, [charity.ContactPerson.PK, stage, dispatch, submitToAws, handleResult]);
}

function getEndowmentContract(stage: Stage) {
  return stage
    .txInfo!.logs![0].events.find(
      (event) => event.type === "instantiate_contract"
    )!
    .attributes.find((attr) => attr.key === "contract_address")!.value;
}
