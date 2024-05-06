import {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import type { DonationState, Update } from "../types";
import { reducer } from "./reducer";

type State = [DonationState, Dispatch<Update>];

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export default function Context({
  children,
  ...initState
}: PropsWithChildren<DonationState>) {
  const slice = useReducer(reducer, initState);

  return <context.Provider value={slice}>{children}</context.Provider>;
}

export function useDonationState(): State {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "useDonationStateState can only be used in components inside Donation context";
  }

  return val;
}
