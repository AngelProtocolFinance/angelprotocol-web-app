import useEthereum from "./useEthereum";
import { createContext, useContext } from "react";
import { Setters, IMetamaskState } from "./types";
import { PropsWithChildren } from "react-router/node_modules/@types/react";

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
