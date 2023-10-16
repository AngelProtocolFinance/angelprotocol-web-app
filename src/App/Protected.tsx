// RequireAuth.js
import { useAuthenticator } from "@aws-amplify/ui-react";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { appRoutes } from "constants/routes";

export default function Protected({ children }: PropsWithChildren) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  if (route !== "authenticated") {
    return (
      <Navigate to={appRoutes.signin} state={{ from: location }} replace />
    );
  }
  return <>{children}</>;
}
