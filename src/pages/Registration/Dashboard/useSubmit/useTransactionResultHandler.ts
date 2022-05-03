import { useEffect } from "react";
import { useSubmitMutation } from "services/aws/registration";
import {
  setFormError,
  setFormLoading,
  setStage,
} from "services/transaction/transactionSlice";
import { Stage, Step } from "services/transaction/types";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../../store";
import useHandleError from "../../useHandleError";

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useTransactionResultHandler() {
  const charity = useGetter((state) => state.charity);
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();

  const handleError = useHandleError();
  const [submit] = useSubmitMutation();

  useEffect(() => {
    async function handle() {
      try {
        const result = await submit({
          PK: charity.ContactPerson.PK!,
          EndowmentContract: getEndowmentContract(stage),
        });

        if ("error" in result) {
          handleError(result.error, FORM_ERROR);
        } else {
          dispatch(
            updateCharity({
              ...charity,
              Registration: {
                ...charity.Registration,
                RegistrationStatus: result.data.RegistrationStatus,
              },
              Metadata: {
                ...charity.Metadata,
                EndowmentContract: result.data.EndowmentContract,
              },
            })
          );
        }
      } catch (error) {
        console.log(error);
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
  }, [charity, stage, dispatch, handleError, submit]);
}

function getEndowmentContract(stage: Stage) {
  return stage
    .txInfo!.logs![0].events.find(
      (event) => event.type === "instantiate_contract"
    )!
    .attributes.find((attr) => attr.key === "contract_address")!.value;
}
