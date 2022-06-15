import { useEffect } from "react";
import { Stage } from "slices/transaction/types";
import {
  useRegistrationState,
  useSubmitMutation,
} from "services/aws/registration";
import { useGetter, useSetter } from "store/accessors";
import {
  setFormError,
  setFormLoading,
  setStage,
} from "slices/transaction/transactionSlice";
import { FORM_ERROR } from "../../constants";
import useHandleError from "../../useHandleError";

export default function useTransactionResultHandler() {
  const { data } = useRegistrationState("old");
  const charity = data!; //ensured by guard
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
        }
      } catch (error) {
        console.log(error);
        dispatch(setStage({ step: "error", message: FORM_ERROR }));
      } finally {
        dispatch(setFormLoading(false));
      }
    }

    if (stage.step === "error") {
      console.log(stage.message);
      dispatch(setFormError(FORM_ERROR)); // also sets form_loading to 'false'
    } else if (stage.step === "success") {
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
