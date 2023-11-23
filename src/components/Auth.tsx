import { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import { SignedInUser } from "slices/auth";
import { appRoutes } from "constants/routes";
import LoaderRing from "./LoaderRing";

export default function withAuth<Props>(
  Component: ComponentType<Props & { user: SignedInUser }>
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
      return (
        <Navigate to={appRoutes.signin} state={{ from: location }} replace />
      );
    }

    return <Component {...props} user={user} />;
  };
}
