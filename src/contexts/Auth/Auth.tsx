import { Amplify } from "aws-amplify";
import { PropsWithChildren, createContext, useContext } from "react";
import config from "./aws-exports";

type ContextState = {};

config.oauth.redirectSignIn = window.location.origin + "/";
config.oauth.redirectSignOut = window.location.origin + "/";
Amplify.configure(config);

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
