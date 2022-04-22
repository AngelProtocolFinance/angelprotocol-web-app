import { PropsWithChildren, createContext, useContext } from "react";
import useBinance from "./useBinanceWallet";

interface IBinanceState {
  loading: boolean;
  connected: boolean;
  address: string | null;
}

type Setters = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export default function BinanceWalletContext(props: PropsWithChildren<{}>) {
  const { setters, state } = useBinance();

  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={setters}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const initialState: IBinanceState = {
  loading: false,
  connected: false,
  address: null,
};
const getContext = createContext<IBinanceState>(initialState);
const setContext = createContext<Setters>({
  connect: async () => {},
  disconnect: async () => {},
});

//only use this hook inside PhantomProvider
export const useSetBinanceWallet = () => useContext(setContext);
export const useGetBinanceWallet = () => useContext(getContext);
