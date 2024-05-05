import {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import type { DonationState } from "../types";
import { type Action, reducer } from "./reducer";

type Props = {
  children?: ReactNode;
  initial: DonationState;
};

type State = {
  state: DonationState;
  dispatch: Dispatch<Action>;
};

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export default function Context(props: Props) {
  const [state, dispatch] = useReducer(reducer, {
    step: "donate-form",
    recipient: {} as any,
  });

  return (
    <context.Provider value={{ state, dispatch }}>
      {props.children}
    </context.Provider>
  );
}

export function useDonationState() {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "useDonationState can only be used in components inside Donation context";
  }

  return val;
}
