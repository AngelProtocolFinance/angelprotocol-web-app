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
  set_state: StateSetter;
};

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export default function Context({
  children,
  ...initState
}: PropsWithChildren<DonationState>) {
  const [state, set] = useState<DonationState>(initState);

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
