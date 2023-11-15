import { useAuthenticator } from "@aws-amplify/ui-react";
import { Popover } from "@headlessui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Authenticator from "components/Authenticator";
import Icon from "components/Icon";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { appRoutes } from "constants/routes";
import Menu from "./Menu";

export default function UserMenu() {
  const { authStatus, user, signOut, route, isPending } = useAuthenticator(
    (context) => [
      context.authStatus,
      context.user,
      context.signOut,
      context.route,
      context.isPending,
    ]
  );

  const isLoading =
    authStatus === "configuring" || route === "transition" || isPending;

  const isAuthenticated = authStatus === "authenticated";

  return (
    <Popover className="relative">
      {isAuthenticated ? (
        <Popover.Button
          disabled={isLoading}
          className="cursor-pointer contents"
        >
          <Icon
            size={24}
            type={isLoading ? "Loading" : "User"}
            className={`text-white disabled:text-gray ${
              isLoading ? "animate-spin" : ""
            }`}
          />
        </Popover.Button>
      ) : (
        <Popover.Button
          className="btn-orange px-3 h-10 rounded-lg text-sm"
          disabled={isLoading}
        >
          Login
        </Popover.Button>
      )}

      {isAuthenticated ? (
        <Popover.Panel className="mt-2 absolute z-10 w-max right-0">
          <Menu user={user} signOut={signOut} isLoading={isLoading} />
        </Popover.Panel>
      ) : (
        <AuthenticatorPanel />
      )}
    </Popover>
  );
}

function AuthenticatorPanel() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith(appRoutes.auth_redirector)) return;
    localStorage.setItem(OAUTH_PATH_STORAGE_KEY, location.pathname);
    //eslint-disable-next-line
  }, [location.pathname]);
  return (
    <Popover.Panel className="mt-2 absolute z-10 w-max max-sm:fixed-center sm:right-0">
      <Authenticator />
    </Popover.Panel>
  );
}
