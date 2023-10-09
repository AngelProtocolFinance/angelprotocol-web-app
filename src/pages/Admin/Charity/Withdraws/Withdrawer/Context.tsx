import { PropsWithChildren, createContext, useContext, useState } from "react";

/**
 * FUTURE: too much boilerplate even using redux (setup slice, add slice to store, export actions etc.)
 * migrate to `Jotai` or `Relay`
 */
export type WithdrawEndowSource = {
  id: number;
  name: string;
};

type WithdrawContext = {
  withdrawEndowSource?: WithdrawEndowSource;
  setWithdrawEndowSource: React.Dispatch<
    React.SetStateAction<WithdrawEndowSource | undefined>
  >;
};

const INIT_VALUE = null as any;
const context = createContext<WithdrawContext>(INIT_VALUE);

export default function Context({ children }: PropsWithChildren) {
  const [source, setSource] = useState<WithdrawEndowSource>();

  return (
    <context.Provider
      value={{ withdrawEndowSource: source, setWithdrawEndowSource: setSource }}
    >
      {children}
    </context.Provider>
  );
}

export const useWithdrawContext = () => {
  const val = useContext(context);
  if (val === INIT_VALUE) {
    throw new Error("can't use this hook outside withdrawer");
  }
  return val;
};
