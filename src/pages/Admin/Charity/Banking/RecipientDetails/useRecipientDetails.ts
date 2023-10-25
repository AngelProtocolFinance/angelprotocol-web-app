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
  expectedFunds: number
) {
  const { id } = useAdminContext();
  const [state, dispatch] = useReducer(reducer, {
    requirementsDataArray: [],
    selectedIndex: 0,
    quote: undefined,
    isLoading: true,
  });
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
        const withdrawAmount = calculateExpectedWithdrawAmount(expectedFunds);
        const quote = await createQuote(targetCurrency, withdrawAmount);
        const newRequirements = await getAccountRequirements(quote.id);
        dispatch({
          type: "accountRequirements",
          payload: { accountRequirements: newRequirements, quote: quote },
        });
      } catch (error) {
        handleError(error, ERROR_MSG);
        dispatch({ type: "isLoading", payload: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    request: CreateRecipientRequest,
    refreshRequirementsNeeded: boolean
  ) => {
    try {
      if (!state.quote) {
        throw new UnexpectedStateError("No 'quote' present.");
      }
      if (isEmpty(state.requirementsDataArray)) {
        throw new UnexpectedStateError("Requirements not loaded.");
      }
      // refresh requirements if necessary
      if (
        !state.requirementsDataArray[state.selectedIndex].refreshed &&
        refreshRequirementsNeeded
      ) {
        const newRequirements = await postAccountRequirements(
          state.quote.id,
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
    ...state,
    isError,
    dispatch,
    handleSubmit,
    updateDefaultValues,
  };
}

// Random calculation, will be handled in separate issue
// See https://linear.app/angel-protocol/issue/AP-859/set-an-actual-calculation-to-get-the-estimate-withdrawal-amount-when
function calculateExpectedWithdrawAmount(sourceAmount: number): number {
  return sourceAmount / 10;
}
