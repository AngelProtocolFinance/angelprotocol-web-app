import { parseRawLog } from "@cosmjs/stargate/build/logs";
import { useEffect } from "react";
import { SuccessStage } from "slices/transaction/types";
import {
  useRegistrationState,
  useSubmitMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetter, useSetter } from "store/accessors";
import {
  setFormError,
  setFormLoading,
  setStage,
} from "slices/transaction/transactionSlice";
import { logger } from "helpers";
import { FORM_ERROR } from "../../constants";

export default function useTransactionResultHandler() {
  const { data } = useRegistrationState("");
  const charity = data!; //ensured by guard
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();

  const { handleError } = useErrorContext();
  const [submit] = useSubmitMutation();

  useEffect(() => {
    async function handle(stage: SuccessStage) {
      try {
        const result = await submit({
          PK: charity.ContactPerson.PK!,
          EndowmentContract: getEndowmentContract(stage),
        });

        if ("error" in result) {
          handleError(result.error, FORM_ERROR);
        }
      } catch (error) {
        logger.error(error);
        dispatch(setStage({ step: "error", message: FORM_ERROR }));
      } finally {
        dispatch(setFormLoading(false));
      }
    }

    if (stage.step === "error") {
      dispatch(setFormError(FORM_ERROR)); // also sets form_loading to 'false'
    } else if (stage.step === "success") {
      //narrowed to SuccessStage
      handle(stage);
    }
  }, [charity, stage, dispatch, handleError, submit]);
}

function getEndowmentContract(stage: SuccessStage) {
  // we can parse these logs with cosmjs because we know that logs came from Juno blockchain
  return parseRawLog(stage.rawLog)[0]
    .events.find((event) => event.type === "instantiate_contract")!
    .attributes.find((attr) => attr.key === "contract_address")!.value;
}
