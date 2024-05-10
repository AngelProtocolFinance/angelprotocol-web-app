import {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import type { DonationState } from "../types";

type State = [DonationState, Dispatch<React.SetStateAction<DonationState>>];

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export default function Context({
  children,
  ...initState
}: PropsWithChildren<DonationState>) {
  const state = useState<DonationState>(initState);

  return <context.Provider value={state}>{children}</context.Provider>;
}

export function useDonationState(): State {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "useDonationStateState can only be used in components inside Donation context";
  }

  return val;
}
