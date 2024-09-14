import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import type { DonationState } from "../types";

type StateSetter = (
  newState: DonationState | ((prev: DonationState) => DonationState)
) => void;

type State = {
  state: DonationState;
  setState: StateSetter;
};

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export default function Context({
  children,
  ...initState
}: PropsWithChildren<DonationState>) {
  const [state, set] = useState<DonationState>(initState);

  const setState: StateSetter = (newState) =>
    set((prev) =>
      typeof newState === "function" ? newState(prev) : { ...prev, ...newState }
    );

  return (
    <context.Provider value={{ state, setState }}>{children}</context.Provider>
  );
}

export function useDonationState(): State {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "useDonationState can only be used in components inside Donation context";
  }

  return val;
}
