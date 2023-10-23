import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { insert } from "helpers";

type RequirementsData = {
  accountRequirements: AccountRequirements;
  currentFormValues?: FormValues;
  refreshed: boolean;
};

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "accountRequirements":
      const {
        accountRequirements,
        // quote
      } = action.payload;
      return {
        ...state,
        // quote: quote,
        requirementsDataArray: accountRequirements.map((item) => ({
          accountRequirements: item,
          refreshed: false,
        })),
      };
    case "formValues":
      return {
        ...state,
        requirementsDataArray: insert(
          state.requirementsDataArray,
          state.selectedIndex,
          {
            ...state.requirementsDataArray[state.selectedIndex],
            currentFormValues: action.payload,
          }
        ),
      };
    case "refreshRequirements":
      return {
        ...state,
        requirementsDataArray: insert(
          state.requirementsDataArray,
          state.selectedIndex,
          {
            ...state.requirementsDataArray[state.selectedIndex],
            accountRequirements: action.payload,
            refreshed: true,
          }
        ),
      };
    case "selectedIndex":
      return { ...state, selectedIndex: action.payload };
    default:
      return state;
  }
}

type State = {
  requirementsDataArray: RequirementsData[];
  selectedIndex: number;
  // quote: Quote | undefined;
};

type Action =
  | {
      type: "accountRequirements";
      payload: {
        // quote: Quote,
        accountRequirements: AccountRequirements[];
      };
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
