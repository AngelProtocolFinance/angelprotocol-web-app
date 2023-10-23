import { useCallback, useEffect, useReducer } from "react";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
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
  // const [quote, setQuote] = useState<Quote>();

  const [state, dispatch] = useReducer(reducer, {
    accountRequirements: [],
    formValuesArray: [],
    requirementsRefreshed: [],
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
    [dispatch]
  );

  const onRefreshRequirements = useCallback(
    (newRequirements: AccountRequirements) =>
      dispatch({ type: "refreshRequirements", payload: newRequirements }),
    [dispatch]
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
        dispatch({ type: "accountRequirements", payload: newRequirements });
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
    isEmpty(state.accountRequirements)
  ) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={state.accountRequirements}
        onChange={(index: number) =>
          dispatch({ type: "selectedIndex", payload: index })
        }
      />
      {state.selectedIndex >= 0 && (
        <Form
          key={`form-${state.accountRequirements[state.selectedIndex].type}`}
          accountRequirements={state.accountRequirements[state.selectedIndex]}
          targetCurrency={targetCurrency}
          // quote={quote}
          onRefreshRequirements={onRefreshRequirements}
          defaultValues={state.formValuesArray[state.selectedIndex]}
          onCleanup={updateDefaultValues}
          requirementsRefreshed={
            state.requirementsRefreshed[state.selectedIndex]
          }
        />
      )}
    </>
  );
}

type State = {
  accountRequirements: AccountRequirements[];
  formValuesArray: FormValues[];
  requirementsRefreshed: boolean[];
  selectedIndex: number;
};

type Action =
  | {
      type: "accountRequirements";
      payload: AccountRequirements[];
    }
  | {
      type: "formValues";
      payload: FormValues;
    }
  | {
      type: "refreshRequirements";
      payload: AccountRequirements;
    }
  | {
      type: "selectedIndex";
      payload: number;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "accountRequirements":
      return {
        ...state,
        accountRequirements: action.payload,
        requirementsRefreshed: Array<boolean>(action.payload.length),
      };
    case "formValues":
      const newFormValuesArray = [
        ...state.formValuesArray.slice(0, state.selectedIndex),
        action.payload,
        ...state.formValuesArray.slice(state.selectedIndex + 1),
      ];
      return { ...state, formValuesArray: newFormValuesArray };
    case "refreshRequirements":
      const newAccountRequirements = [
        ...state.accountRequirements.slice(0, state.selectedIndex),
        action.payload,
        ...state.accountRequirements.slice(state.selectedIndex + 1),
      ];
      return {
        ...state,
        accountRequirements: newAccountRequirements,
        requirementsRefreshed: insert(
          state.requirementsRefreshed,
          state.selectedIndex,
          true
        ),
      };
    case "selectedIndex":
      return { ...state, selectedIndex: action.payload };
    default:
      return state;
  }
}

function insert<T>(arr: T[], at: number, item: T): T[] {
  return [...arr.slice(0, at), item, ...arr.slice(at + 1)];
}
