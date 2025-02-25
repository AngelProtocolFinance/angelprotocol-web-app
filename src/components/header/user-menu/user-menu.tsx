import { Link, NavLink, useLocation } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { useRootData } from "hooks/use-root-data";
import { CircleUserRound } from "lucide-react";

export default function UserMenu({ classes = "" }) {
  const user = useRootData();
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
          className="btn-blue text-nowrap px-6 py-2 rounded-full"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <NavLink
      to={`${appRoutes.user_dashboard}/edit-profile`}
      className="[&:is(.pending)]:grayscale"
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
        <CircleUserRound size={24} className="text-blue disabled:text-gray" />
      )}
    </NavLink>
  );
}
