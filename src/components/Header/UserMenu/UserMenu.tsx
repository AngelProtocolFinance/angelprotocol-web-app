import { Link, useLocation } from "@remix-run/react";
import { useRouteLoaderData } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { CircleUserRound } from "lucide-react";
import type { UserV2 } from "types/auth";

export default function UserMenu({ classes = "" }) {
  const user = useRouteLoaderData("root") as UserV2 | null;
  const { pathname: p, search: s } = useLocation();
  const to = p + s;
  if (!user) {
    return (
      <div className={`${classes} flex items-center gap-x-4`}>
        <Link
          to={appRoutes.signin + `?redirect=${to}`}
          className="btn text-base normal-case hover:underline"
        >
          Log in
        </Link>
        <Link
          to={appRoutes.signup + `?redirect=${to}`}
          className="btn text-base normal-case bg-blue-d1 hover:bg-blue text-white text-nowrap px-6 py-2 rounded-full"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <Link
      to={`${appRoutes.user_dashboard}/edit-profile`}
      className="cursor-pointer contents"
    >
      {user.avatar ? (
        //TODO: migrate userdb attribute to custom attribute
        <img
          src={user.avatar}
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
