import useEthereum from "./useEthereum";
import { createContext, useContext, PropsWithChildren } from "react";
import { Setters, IMetamaskState } from "./types";

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

export const useSetMetamask = () => useContext(setContext);
export const useGetMetamask = () => useContext(getContext);
