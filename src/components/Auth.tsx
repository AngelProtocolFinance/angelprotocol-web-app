import { ComponentType, createContext, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import { AuthenticatedUser, PreRenderCredential } from "slices/auth";
import { appRoutes } from "constants/routes";
import Icon from "./Icon";
import LoaderRing from "./LoaderRing";

export default function withAuth<Props>(
  Component: ComponentType<Props & { user: AuthenticatedUser }>
) {
  return function Protected({
    authorization = [],
    ...props
  }: Props & { authorization?: PreRenderCredential[] }) {
    const location = useLocation();
    const user = useGetter((state) => state.auth.user);

    if (user === "loading" || user?.isSigningOut) {
      return (
        <div className="grid content-start place-items-center py-8">
          <LoaderRing thickness={12} classes="w-32 mt-8" />
        </div>
      );
    }

    if (!user) {
      return (
        <Navigate to={appRoutes.signin} state={{ from: location }} replace />
      );
    }

    if (!authorization.every((c) => user.credentials.includes(c))) {
      return (
        <div className="grid content-start place-items-center py-20">
          <Icon type="ExclamationCircleFill" size={80} className="text-red" />
          <p className="text-xl mt-8 font-work ">Unauthorized</p>
        </div>
      );
    }

    /**
     * if wish to access user via props wrap component:
     * withAuth(function Component({user, ...restProps}){
     * })
     */
    return (
      <Context.Provider value={user}>
        <Component {...(props as Props)} user={user} />
      </Context.Provider>
    );
  };
}

const INIT = "__init__" as unknown as AuthenticatedUser;
const Context = createContext<AuthenticatedUser>(INIT);

export function useAuthenticatedUser() {
  const val = useContext(Context);
  if (val === INIT)
    throw new Error(
      "useAuthenticatedUser can only be used in components inside withAuth HOC"
    );
  return val;
}
