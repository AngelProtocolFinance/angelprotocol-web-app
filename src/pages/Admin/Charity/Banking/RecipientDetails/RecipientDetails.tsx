import { useCallback, useEffect, useReducer } from "react";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import useTypedWiseMutation from "../useTypedWiseMutation";
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
    // quote: undefined
  });

  const {
    createQuote,
    // getAccountRequirements,
    getAccountRequirementsForRoute,
  } = useTypedWiseMutation();
  const { handleError } = useErrorContext();

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
    // createQuote(targetCurrency, sourceAmount).then((quote) =>
    //   getAccountRequirements(quote.id).then((newRequirements) =>
    //     dispatch({
    //       type: "accountRequirements",
    //       payload: { accountRequirements: newRequirements, quote: quote },
    //     })
    //   )
    // );
    getAccountRequirementsForRoute(targetCurrency, sourceAmount)
      .then((newRequirements) => {
        dispatch({
          type: "accountRequirements",
          payload: { accountRequirements: newRequirements },
        });
      })
      .catch((error) => handleError(error));
  }, [
    createQuote,
    // getAccountRequirements,
    getAccountRequirementsForRoute,
    handleError,
    sourceAmount,
    targetCurrency,
  ]);

  if (
    // !state.quote ||
    isEmpty(state.requirementsDataArray)
  ) {
    return <span>Loading...</span>;
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
          // quote={state.quote}
          onRefreshRequirements={onRefreshRequirements}
          defaultValues={requirements.currentFormValues}
          onCleanup={updateDefaultValues}
          requirementsRefreshed={requirements.refreshed}
        />
      )}
    </>
  );
}
