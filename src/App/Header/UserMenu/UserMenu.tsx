import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import { appRoutes } from "constants/routes";
import { Link, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import type { SignInRouteState } from "types/auth";

export default function UserMenu() {
  const user = useGetter((state) => state.auth.user);

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
          to={appRoutes.signup}
          state={state}
          className="btn text-base normal-case max-sm:hidden bg-blue-d1 hover:bg-blue text-white text-nowrap px-6 py-2 rounded-full"
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
    <Link to={appRoutes.user_dashboard} className="cursor-pointer contents">
      <Icon size={24} type="User" className="text-blue disabled:text-navy-l2" />
    </Link>
  );
}
