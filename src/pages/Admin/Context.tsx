import { PropsWithChildren, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AuthenticatedUser } from "types/auth";
import Icon from "components/Icon";
import { idParamToNum } from "helpers";

type AdminContext = { id: number; user: AuthenticatedUser };

export function Context({
  children,
  user,
}: PropsWithChildren<{ user: AuthenticatedUser }>) {
  const { id } = useParams<AdminParams>();

  if (!user.endowments.includes(idParamToNum(id))) {
    return (
      <div className="grid content-start place-items-center py-20">
        <Icon type="ExclamationCircleFill" size={80} className="text-red" />
        <p className="text-xl mt-8 font-work ">Unauthorized</p>
      </div>
    );
  }

  return (
    <context.Provider value={{ id: idParamToNum(id), user }}>
      {children}
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
