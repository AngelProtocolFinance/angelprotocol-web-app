import { FormValues } from "./types";
import { AccountRequirements, Quote } from "types/aws";

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "accountRequirements":
      const { accountRequirements, quote } = action.payload;
      return {
        ...state,
        quote: quote,
        requirementsDataArray: accountRequirements.map((item) => ({
          accountRequirements: item,
          refreshed: false,
        })),
        isLoading: false,
      };
    case "formValues":
      const reqArr = [...state.requirementsDataArray];
      reqArr[state.selectedIndex].currentFormValues = action.payload;
      return {
        ...state,
        requirementsDataArray: reqArr,
      };
    case "refreshRequirements":
      const reqArr2 = [...state.requirementsDataArray];
      reqArr2[state.selectedIndex].accountRequirements = action.payload;
      reqArr2[state.selectedIndex].refreshed = true;
      return {
        ...state,
        requirementsDataArray: reqArr2,
      };
    case "selectedIndex":
      return { ...state, selectedIndex: action.payload };
    case "isLoading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

type State = {
  requirementsDataArray: RequirementsData[];
  selectedIndex: number;
  quote: Quote | undefined;
  isLoading: boolean;
};

type RequirementsData = {
  accountRequirements: AccountRequirements;
  currentFormValues?: FormValues;
  refreshed: boolean;
};

type Action =
  | {
      type: "accountRequirements";
      payload: {
        quote: Quote;
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
    }
  | {
      type: "isLoading";
      payload: boolean;
    };
