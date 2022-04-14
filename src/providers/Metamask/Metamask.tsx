import { PropsWithChildren, createContext, useContext } from "react";
import { IMetamaskState, Setters } from "./types";
import useEthereum from "./useEthereum";

export default function Metamask(props: PropsWithChildren<{}>) {
  const { setters, state } = useEthereum();

  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={setters}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const initialState: IMetamaskState = {
  loading: false,
  connected: false,
  address: null,
};
const getContext = createContext<IMetamaskState>(initialState);
const setContext = createContext<Setters>({
  connect: async () => {},
  disconnect: async () => {},
});

//only use this hook inside PhantomProvider
export const useSetMetamask = () => useContext(setContext);
export const useGetMetamask = () => useContext(getContext);
