import { useEffect } from "react";
import { SuccessStage } from "slices/transaction/types";
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
import { parseRawLog } from "helpers/third-party/cosmjs";
import { FORM_ERROR } from "../../constants";
import useHandleError from "../../useHandleError";

export default function useTransactionResultHandler() {
  const { data } = useRegistrationState("");
  const charity = data!; //ensured by guard
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();

  const handleError = useHandleError();
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
        console.log(error);
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
  const logs = parseRawLog(stage.rawLogs);
  return logs![0].events
    .find((event) => event.type === "instantiate")!
    .attributes.find((attr) => attr.key === "_contract_address")!.value;
}
