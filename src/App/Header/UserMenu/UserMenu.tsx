import { Popover } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { SignInRouteState } from "types/routeStates";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { logout } from "slices/auth";
import { appRoutes } from "constants/routes";
import Menu from "./Menu";

export default function UserMenu() {
  const user = useGetter((state) => state.auth.user);
  const dispatch = useSetter();

  const location = useLocation();

  if (!user || user === "loading") {
    const state: SignInRouteState = { from: location.pathname };
    return (
      <Link
        to={appRoutes.signin}
        state={state}
        className="btn-orange px-3 h-10 rounded-lg text-sm"
        aria-disabled={user === "loading"}
      >
        Login
      </Link>
    );
  }

  return (
    <Popover className="relative">
      <Popover.Button className="cursor-pointer contents">
        <Icon size={24} type="User" className="text-blue disabled:text-gray" />
      </Popover.Button>

      <Menu
        user={user}
        signOut={() => dispatch(logout())}
        classes="mt-2 absolute z-10 w-max right-0"
      />
    </Popover>
  );
}
