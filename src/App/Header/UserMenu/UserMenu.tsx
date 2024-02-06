import { Popover } from "@headlessui/react";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "slices/auth";
import { useGetter, useSetter } from "store/accessors";
import { SignInRouteState } from "types/routeStates";
import Menu from "./Menu";

export default function UserMenu() {
  const user = useGetter((state) => state.auth.user);
  const dispatch = useSetter();

  const location = useLocation();

  if (!user || user === "loading") {
    const state: SignInRouteState = { from: location.pathname };
    return (
      <>
        <Link
          to={appRoutes.signin}
          state={state}
          className="btn text-base normal-case max-sm:hidden hover:underline"
          aria-disabled={user === "loading"}
        >
          Login
        </Link>
        <Link
          to={appRoutes.signin}
          state={state}
          className="btn text-base normal-case max-sm:hidden bg-blue-d1 text-white px-6 lg:px-7 py-3 rounded-full"
          aria-disabled={user === "loading"}
        >
          Sign up
        </Link>
      </>
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
