import usePhantom from "./usePhantom";
import { createContext, useContext } from "react";
import { Props, Setters, State } from "./types";

export default function Phantom(props: Props) {
  const { setters, state } = usePhantom();
  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={setters}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const initialState: State = {
  loading: false,
  connected: false,
  balance: 0,
  address: "",
  provider: null,
};
const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connect: async () => {},
  disconnect: async () => {},
});

//only use this hook inside PhantomProvider
export const useSetPhantom = () => useContext(setContext);
export const useGetPhantom = () => useContext(getContext);
