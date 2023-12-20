import { useReducer } from "react";
import { FormValues, RequirementsData } from "../types";
import { AccountRequirements, Quote } from "types/aws";
import { UnexpectedStateError } from "errors/errors";
import { Currency } from "../../../CurrencySelector";
import mergeRequirements from "./mergeRequirements";

type State = {
  activeRequirementsDataArray: RequirementsData[];
  focusNewRequirements: boolean;
  isError: boolean;
  isLoading: boolean;
  quote: Quote | undefined; // store quote to use to refresh requirements
  requirementsDataArray: RequirementsData[];
  selectedRequirementsData: RequirementsData | undefined;
};

type ChangeSelectedRequirementsData = {
  type: "CHANGE_SELECTED_REQUIREMENTS_DATA";
  payload: RequirementsData;
};

type SetError = {
  type: "ERROR";
  payload: boolean;
};

type SetLoading = {
  type: "LOADING";
  payload: boolean;
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
  | SetError
  | SetLoading
  | UpdateFormValues
  | UpdateRequirements;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE_SELECTED_REQUIREMENTS_DATA": {
      return {
        ...state,
        selectedRequirementsData: action.payload,
        focusNewRequirements: false,
      };
    }
    case "ERROR": {
      return {
        ...state,
        isError: action.payload,
      };
    }
    case "LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
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
      const {
        currency,
        isRefreshed = false,
        quote = state.quote,
        requirements,
      } = action.payload;

      const requirementsDataArray = mergeRequirements(
        [...state.requirementsDataArray],
        requirements,
        currency,
        isRefreshed
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
        focusNewRequirements: isRefreshed,
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
  const state: State = {
    activeRequirementsDataArray: [],
    focusNewRequirements: false,
    isError: false,
    isLoading: true,
    quote: undefined,
    requirementsDataArray: [],
    selectedRequirementsData: undefined,
  };
  return useReducer(reducer, state);
}
