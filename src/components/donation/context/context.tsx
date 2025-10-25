import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import type { State, StateSetter, TDonation } from "../types";

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export function Context({
  children,
  ...initState
}: PropsWithChildren<TDonation>) {
  const [state, set_state] = useState<TDonation>(initState);

  const don_set: StateSetter = (new_state) =>
    set_state((prev) =>
      typeof new_state === "function"
        ? new_state(prev)
        : { ...prev, ...new_state }
    );

  return (
    <context.Provider value={{ don: state, don_set }}>
      {children}
    </context.Provider>
  );
}

export function use_donation(): State {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "use_donation can only be used in components inside Donation context";
  }

  return val;
}
