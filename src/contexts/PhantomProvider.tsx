import usePhantom from "./usePhantom";
import { createContext, ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  loading: boolean;
  connected: boolean;
  balance: number;
  address: string;
  provider: any | null;
};

type Setters = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

const initialState: State = {
  loading: false,
  connected: false,
  balance: 0,
  address: "",
  provider: null,
};

export default function PhantomProvider(props: Props) {
  const { setters, state } = usePhantom();
  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={setters}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connect: async () => {},
  disconnect: async () => {},
});

//only use this hook inside PhantomProvider
export const useSetPhantom = () => useContext(setContext);
export const useGetPhantom = () => useContext(getContext);
