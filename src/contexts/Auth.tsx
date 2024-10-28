import LoaderRing from "components/LoaderRing";
import { appRoutes } from "constants/routes";
import { CircleAlert } from "lucide-react";
import { type ComponentType, createContext, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import type { AuthenticatedUser, CognitoGroup } from "types/auth";
import type { SignInRouteState } from "types/auth";

export default function withAuth<Props>(
  Component: ComponentType<Props & { user: AuthenticatedUser }>,
  requiredGroups?: CognitoGroup[]
) {
  return function Protected(props: Props) {
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
      const state: SignInRouteState = {
        from: location.pathname,
        data: location.state,
      };
      return <Navigate to={appRoutes.signup} state={state} replace />;
    }

    if (!(requiredGroups || []).every((g) => user.groups.includes(g))) {
      return (
        <div className="grid content-start place-items-center py-20">
          <CircleAlert size={80} className="text-red" />
          <p className="text-xl mt-8">Unauthorized</p>
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
        <Component {...props} user={user} />
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
