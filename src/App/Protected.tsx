import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoaderRing from "components/LoaderRing";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";

export default function Protected({ children }: PropsWithChildren) {
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
  return <>{children}</>;
}
