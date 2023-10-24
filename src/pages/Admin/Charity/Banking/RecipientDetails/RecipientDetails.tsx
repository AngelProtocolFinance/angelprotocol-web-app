import { useCallback, useEffect, useReducer } from "react";
import { FormValues } from "./types";
import { AccountRequirements } from "types/aws";
import { useWiseMutationProxy } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import Form from "./Form";
import reducer from "./reducer";

type Props = {
  targetCurrency: string;
  sourceAmount: number;
};

export default function RecipientDetails({
  targetCurrency,
  sourceAmount,
}: Props) {
  const [state, dispatch] = useReducer(reducer, {
    requirementsDataArray: [],
    selectedIndex: -1,
    quote: undefined,
  });
  const { handleError } = useErrorContext();
  const {
    createQuote,
    getAccountRequirements,
    state: { isError },
  } = useWiseMutationProxy();

  const updateDefaultValues = useCallback(
    (formValues: FormValues) =>
      dispatch({ type: "formValues", payload: formValues }),
    [dispatch]
  );

  const onRefreshRequirements = useCallback(
    (newRequirements: AccountRequirements) =>
      dispatch({ type: "refreshRequirements", payload: newRequirements }),
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
        handleError(
          error,
          `An error occured. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}`
        );
      }
    })();
  }, [
    createQuote,
    getAccountRequirements,
    handleError,
    sourceAmount,
    targetCurrency,
  ]);

  if (!state.quote || isEmpty(state.requirementsDataArray)) {
    return (
      <div className="flex gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError) {
    return null;
  }

  const requirements = state.requirementsDataArray[state.selectedIndex];

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={state.requirementsDataArray.map(
          (x) => x.accountRequirements
        )}
        currentIndex={state.selectedIndex}
        onChange={(index: number) =>
          dispatch({ type: "selectedIndex", payload: index })
        }
      />
      {state.selectedIndex >= 0 && (
        <Form
          key={`form-${requirements.accountRequirements.type}`}
          accountRequirements={requirements.accountRequirements}
          targetCurrency={targetCurrency}
          quote={state.quote}
          onRefreshRequirements={onRefreshRequirements}
          defaultValues={requirements.currentFormValues}
          onCleanup={updateDefaultValues}
          requirementsRefreshed={requirements.refreshed}
        />
      )}
    </>
  );
}
