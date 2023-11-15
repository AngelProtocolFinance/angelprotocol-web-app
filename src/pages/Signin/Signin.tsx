import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import Authenticator from "components/Authenticator";
import LoaderRing from "components/LoaderRing";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";

export default function Signin() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const _state = state as { from?: Location } | undefined;

  const { route, authStatus } = useAuthenticator((context) => [
    context.route,
    context.authStatus,
  ]);

  const from = _state?.from?.pathname || "/";
  const search = _state?.from?.search || "";

  useEffect(() => {
    localStorage.setItem(OAUTH_PATH_STORAGE_KEY, from);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (route === "authenticated") {
      navigate({ pathname: from, search }, { replace: true });
    }
  }, [route, navigate, from, search]);

  return (
    <div className="grid place-items-center py-14">
      {authStatus === "configuring" || authStatus === "authenticated" ? (
        //while user is still authenticated, use loader in place of authenticator while navigating
        <LoaderRing thickness={12} classes="w-32" />
      ) : (
        <Authenticator />
      )}
    </div>
  );
}
