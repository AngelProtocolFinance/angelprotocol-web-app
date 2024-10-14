import { idParamToNum } from "helpers";
import { CircleAlert } from "lucide-react";
import { type PropsWithChildren, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import type { UserV2 } from "types/auth";
import type { AdminParams } from "./types";

type AdminContext = { id: number; user: UserV2 };

export function Context({
  children,
  user,
}: PropsWithChildren<{ user: UserV2 }>) {
  const { id } = useParams<AdminParams>();

  console.log({ user, id });

  if (!user.endowments.includes(idParamToNum(id))) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
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
