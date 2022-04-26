import { PropsWithChildren, createContext, useContext } from "react";
import { IBinanceState, Setters } from "./types";
import useBinance from "./useBinance";

export default function BinanceWallet(props: PropsWithChildren<{}>) {
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
export const useSetBinance = () => useContext(setContext);
export const useGetBinance = () => useContext(getContext);
