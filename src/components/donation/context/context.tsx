import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import type { State, StateSetter, TDonationState } from "../types";

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export function Context({
  children,
  ...initState
}: PropsWithChildren<TDonationState>) {
  const [state, set] = useState<TDonationState>(initState);

  const set_state: StateSetter = (new_state) =>
    set((prev) =>
      typeof new_state === "function"
        ? new_state(prev)
        : { ...prev, ...new_state }
    );

  return (
    <context.Provider value={{ state, set_state }}>{children}</context.Provider>
  );
}

export function use_donation_state(): State {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "useDonationState can only be used in components inside Donation context";
  }

  return val;
}
