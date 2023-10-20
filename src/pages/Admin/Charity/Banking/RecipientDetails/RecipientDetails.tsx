import { useCallback, useReducer } from "react";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import Form from "./Form";

type Props = {
  targetCurrency: string;
  accountRequirements: AccountRequirements[];
};

export default function RecipientDetails({
  accountRequirements,
  targetCurrency,
}: Props) {
  const [state, dispatch] = useReducer(reducer, {
    formValuesArray: [],
    selectedIndex: -1,
  });

  const updateDefaultValues = useCallback(
    (formValues: FormValues) =>
      dispatch({ type: "formValues", payload: formValues }),
    []
  );

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
