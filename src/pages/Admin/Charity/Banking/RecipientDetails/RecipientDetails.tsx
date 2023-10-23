import { useCallback, useEffect, useReducer, useState } from "react";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import useTypedWiseMutation from "../useTypedWiseMutation";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import Form from "./Form";

type Props = {
  targetCurrency: string;
  sourceAmount: number;
};

export default function RecipientDetails({
  targetCurrency,
  sourceAmount,
}: Props) {
  const [accountRequirements, setAccountRequirements] =
    useState<AccountRequirements[]>();
  // const [quote, setQuote] = useState<Quote>();

  const [state, dispatch] = useReducer(reducer, {
    formValuesArray: [],
    selectedIndex: -1,
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
    []
  );

  const onRefreshRequirements = useCallback(
    (newRequirements: AccountRequirements[]) =>
      setAccountRequirements(newRequirements),
    []
  );

  useEffect(() => {
    // createQuote(targetCurrency, sourceAmount)
    //   .then((quote) =>
    //     getAccountRequirements(quote.id).then((newRequirements) => {
    //       (newRequirements) => {
    //         setAccountRequirements(newRequirements);
    //         setQuote(quote);
    //       }
    //     )
    //   )
    getAccountRequirementsForRoute(targetCurrency, sourceAmount)
      .then((newRequirements) => {
        setAccountRequirements(newRequirements);
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
    // !quote ||
    !accountRequirements
  ) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={accountRequirements}
        onChange={(index: number) =>
          dispatch({ type: "selectedIndex", payload: index })
        }
      />
      {state.selectedIndex >= 0 && (
        <Form
          key={`form-${accountRequirements[state.selectedIndex].type}`}
          accountRequirements={accountRequirements[state.selectedIndex]}
          targetCurrency={targetCurrency}
          // quote={quote}
          onRefreshRequirements={onRefreshRequirements}
          defaultValues={state.formValuesArray[state.selectedIndex]}
          onCleanup={updateDefaultValues}
        />
      )}
    </>
  );
}

type State = {
  formValuesArray: FormValues[];
  selectedIndex: number;
};

type Action =
  | {
      type: "formValues";
      payload: FormValues;
    }
  | {
      type: "selectedIndex";
      payload: number;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "formValues":
      state.formValuesArray[state.selectedIndex] = action.payload;
      return state;
    case "selectedIndex":
      return { ...state, selectedIndex: action.payload };
    default:
      return state;
  }
}
