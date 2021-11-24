import useKeplr from "./useKeplr";
import { createContext, useContext } from "react";
import { KeplrState, Props, Setters } from "./types";

export default function Keplr(props: Props) {
  const { setters, state } = useKeplr();
  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={setters}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const initialState: KeplrState = {
  loading: false,
  connected: false,
  balance: [],
  address: "",
  provider: undefined,
};

const getContext = createContext<KeplrState>(initialState);
const setContext = createContext<Setters>({
  connect: async () => {},
  disconnect: async () => {},
});

//only use this hook inside PhantomProvider
export const useSetKeplr = () => useContext(setContext);
export const useGetKeplr = () => useContext(getContext);
