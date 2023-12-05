import { useReducer } from "react";
import { FormValues, RequirementsData } from "../types";
import { AccountRequirements, Quote } from "types/aws";
import { Currency } from "components/BankDetails/CurrencySelector";
import { UnexpectedStateError } from "errors/errors";
import mergeRequirements from "./mergeRequirements";

type State = {
  quote: Quote | undefined; // store quote to use to refresh requirements
  activeRequirementsDataArray: RequirementsData[];
  requirementsDataArray: RequirementsData[];
  selectedRequirementsData: RequirementsData | undefined;
};

type ChangeSelectedRequirementsData = {
  type: "CHANGE_SELECTED_REQUIREMENTS_DATA";
  payload: RequirementsData;
};

type UpdateFormValues = {
  type: "UPDATE_FORM_VALUES";
  payload: FormValues;
};

type UpdateRequirements = {
  type: "UPDATE_REQUIREMENTS";
  payload: {
    currency: Currency;
    isRefreshed?: boolean;
    quote?: Quote;
    requirements: AccountRequirements[];
  };
};

type Action =
  | ChangeSelectedRequirementsData
  | UpdateFormValues
  | UpdateRequirements;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE_SELECTED_REQUIREMENTS_DATA": {
      return { ...state, selectedRequirementsData: action.payload };
    }
    case "UPDATE_FORM_VALUES": {
      const updated = [...state.requirementsDataArray];
      const toUpdate = updated.find(
        (x) => x.accountRequirements.type === action.payload.type
      );

      if (!!toUpdate) {
        toUpdate.currentFormValues = action.payload;
        return { ...state, requirementsDataArray: updated };
      }

      throw new UnexpectedStateError(
        `Trying to update a non existent requirements type: ${action.payload.type}`
      );
    }
    case "UPDATE_REQUIREMENTS": {
      const quote = action.payload.quote ?? state.quote;
      const requirementsDataArray = mergeRequirements(
        [...state.requirementsDataArray],
        action.payload.requirements,
        action.payload.currency,
        action.payload.isRefreshed
      );
      const activeRequirementsDataArray = requirementsDataArray.filter(
        (x) => x.active
      );
      const selectedRequirementsData =
        activeRequirementsDataArray.find(
          (x) =>
            x.accountRequirements.type ===
            state.selectedRequirementsData?.accountRequirements.type
        ) ?? activeRequirementsDataArray.at(0);

      return {
        ...state,
        activeRequirementsDataArray,
        quote,
        requirementsDataArray,
        selectedRequirementsData,
      };
    }
  }
}

/**
 * Updating requirements includes updating the requirement data array based on that, updating
 * the selected requirement data item
 */
export default function useStateReducer() {
  return useReducer(reducer, {
    activeRequirementsDataArray: [],
    quote: undefined,
    requirementsDataArray: [],
    selectedRequirementsData: undefined,
  });
}
