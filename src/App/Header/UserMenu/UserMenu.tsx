import { Popover } from "@headlessui/react";
import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import { appRoutes } from "constants/routes";
import { Link, useLocation } from "react-router-dom";
import { logout } from "slices/auth";
import { useGetter, useSetter } from "store/accessors";
import { SignInRouteState } from "types/routeStates";
import Menu from "./Menu";

export default function UserMenu() {
  const user = useGetter((state) => state.auth.user);
  const dispatch = useSetter();

  const location = useLocation();

  if (!user) {
    const state: SignInRouteState = { from: location.pathname };
    return (
      <>
        <Link
          to={appRoutes.signin}
          state={state}
          className="btn text-base normal-case max-sm:hidden hover:underline"
        >
          Log in
        </Link>
        <Link
          to={appRoutes.signin}
          state={state}
          className="btn text-base normal-case max-sm:hidden bg-blue-d1 hover:bg-blue text-white text-nowrap px-5 sm:px-6 lg:px-7 py-3 rounded-full"
        >
          Sign up
        </Link>
      </>
    );
  }

  if (user === "loading") {
    return <LoaderRing thickness={10} classes="w-6" />;
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
