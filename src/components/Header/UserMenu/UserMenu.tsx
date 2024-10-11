import { appRoutes } from "constants/routes";
import { toWithState } from "helpers/state-params";
import { CircleUserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import type { SignInRouteState } from "types/auth";
import LoaderRing from "../../LoaderRing";

export default function UserMenu({ classes = "" }) {
  const user = useGetter((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    const state: SignInRouteState = { from: location.pathname };
    return (
      <div className={`${classes} flex items-center gap-x-4`}>
        <Link
          to={toWithState(appRoutes.signin, state)}
          className="btn text-base normal-case hover:underline"
        >
          Log in
        </Link>
        <Link
          to={toWithState(appRoutes.signup, state)}
          className="btn text-base normal-case bg-blue-d1 hover:bg-blue text-white text-nowrap px-6 py-2 rounded-full"
        >
          Sign up
        </Link>
      </div>
    );
  }

  if (user === "loading") {
    return <LoaderRing thickness={10} classes="w-6" />;
  }

  return (
    <Link
      to={`${appRoutes.user_dashboard}/edit-profile`}
      className="cursor-pointer contents"
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          className="rounded-full"
          height={32}
          width={32}
        />
      ) : (
        <CircleUserRound
          size={24}
          className="text-blue disabled:text-navy-l2"
        />
      )}
    </Link>
  );
}
