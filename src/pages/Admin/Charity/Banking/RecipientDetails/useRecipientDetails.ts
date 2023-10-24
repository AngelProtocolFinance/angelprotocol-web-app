import { useCallback, useEffect, useReducer } from "react";
import { FormValues } from "./types";
import { CreateRecipientRequest } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import { useWiseMutationProxy } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { EMAIL_SUPPORT } from "constants/env";
import reducer from "./reducer";

const ERROR_MSG = `An error occured. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}`;

export default function useRecipientDetails(
  targetCurrency: string,
  sourceAmount: number
) {
  const [state, dispatch] = useReducer(reducer, {
    requirementsDataArray: [],
    selectedIndex: -1,
    quote: undefined,
  });
  const { quote, requirementsDataArray, selectedIndex } = state;

  const { id } = useAdminContext();
  const { handleError } = useErrorContext();
  const {
    createQuote,
    getAccountRequirements,
    postAccountRequirements,
    createRecipientAccount,
    state: { isError },
  } = useWiseMutationProxy();

  const updateDefaultValues = useCallback(
    (formValues: FormValues) =>
      dispatch({ type: "formValues", payload: formValues }),
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      try {
        const quote = await createQuote(targetCurrency, sourceAmount);
        const newRequirements = await getAccountRequirements(quote.id);
        dispatch({
          type: "accountRequirements",
          payload: { accountRequirements: newRequirements, quote: quote },
        });
      } catch (error) {
        handleError(error, ERROR_MSG);
      }
    })();
  }, [
    createQuote,
    getAccountRequirements,
    handleError,
    sourceAmount,
    targetCurrency,
  ]);

  const handleSubmit = async (
    request: CreateRecipientRequest,
    refreshRequirementsNeeded: boolean
  ) => {
    try {
      if (!quote) {
        throw new UnexpectedStateError("No 'quote' present.");
      }
      if (isEmpty(requirementsDataArray)) {
        throw new UnexpectedStateError("Requirements not loaded.");
      }
      // refresh requirements if necessary
      if (
        !requirementsDataArray[selectedIndex].refreshed &&
        refreshRequirementsNeeded
      ) {
        const newRequirements = await postAccountRequirements(
          quote.id,
          request
        );
        dispatch({ type: "refreshRequirements", payload: newRequirements });
      }
      // otherwise create the recipient
      else {
        await createRecipientAccount(id, request);
      }
    } catch (error) {
      handleError(error, ERROR_MSG);
    }
  };

  return {
    quote,
    requirementsDataArray,
    selectedIndex,
    isError,
    dispatch,
    handleSubmit,
    updateDefaultValues,
  };
}
