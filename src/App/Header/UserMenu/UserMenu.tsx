import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { appRoutes } from "constants/routes";
import { CircleUserRound } from "lucide-react";
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
    <Link
      to={`${appRoutes.user_dashboard}/edit-profile`}
      className="cursor-pointer contents"
    >
      {user.avatarUrl ? (
        <Image src={user.avatarUrl} className="rounded-full size-8" />
      ) : (
        <CircleUserRound
          size={24}
          className="text-blue disabled:text-navy-l2"
        />
      )}
    </Link>
  );
}
