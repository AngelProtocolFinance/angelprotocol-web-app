import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import {
  Connection,
  Installation,
  ProviderId,
} from "contexts/WalletContext/types";
import { WithBalance } from "services/types";

export type WalletState = {
  walletIcon: string;
  displayCoin: WithBalance;
  coins: WithBalance[];
  address: string;
  chainId: string;
  providerId: ProviderId;
};

type State = {
  wallet?: WalletState;
  isWalletLoading: boolean;
  isProviderLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
  installations: Installation[];
};

const initialState: State = {
  wallet: undefined,
  isWalletLoading: true,
  isProviderLoading: true,
};

export default function StaticWalletContext({
  children,
  ...state
}: PropsWithChildren<State>) {
  return (
    <getContext.Provider value={state}>
      <setContext.Provider
        value={{
          connections: [],
          installations: [],
          disconnect: () => {},
        }}
      >
        {children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  installations: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);
