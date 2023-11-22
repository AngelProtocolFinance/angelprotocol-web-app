import { useAuthenticator } from "@aws-amplify/ui-react";
import { Popover } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
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

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Link
        to={appRoutes.signin}
        state={{ from: location }}
        className="btn-orange px-3 h-10 rounded-lg text-sm"
        aria-disabled={isLoading}
      >
        Login
      </Link>
    );
  }

  return (
    <Popover className="relative">
      <Popover.Button disabled={isLoading} className="cursor-pointer contents">
        <Icon
          size={24}
          type={isLoading ? "Loading" : "User"}
          className={`text-white disabled:text-gray ${
            isLoading ? "animate-spin" : ""
          }`}
        />
      </Popover.Button>

      <Popover.Panel className="mt-2 absolute z-10 w-max right-0">
        <Menu
          userEmail={user.username}
          signOut={signOut}
          isLoading={isLoading}
        />
      </Popover.Panel>
    </Popover>
  );
}
