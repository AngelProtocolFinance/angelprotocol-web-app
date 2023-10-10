import { PropsWithChildren, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { idParamToNum } from "helpers";

type AdminContext = { id: number };

export function Context(props: PropsWithChildren) {
  const { id } = useParams<AdminParams>();

  return (
    <context.Provider value={{ id: idParamToNum(id) }}>
      {props.children}
    </context.Provider>
  );
}

const INIT = "INIT" as any;
const context = createContext(INIT as AdminContext);
export const useAdminContext = (): AdminContext => {
  const val = useContext(context);
  if (val === INIT) {
    throw new Error("useAdminContext should only be used inside AdminGuard");
  }
  return val;
};
