import { PropsWithChildren, createContext, useContext } from "react";

type ContextState = {};

export default function ModalContext(
  props: PropsWithChildren<{ id?: string }>
) {
  return <Context.Provider value={{}}>{props.children}</Context.Provider>;
}

const Context = createContext<ContextState>({} as ContextState);

export const useModalContext = () => {
  const val = useContext(Context);
  if (Object.entries(val).length <= 0) {
    throw new Error("This hook can only be used inside Modalcontext");
  }
  return val;
};
