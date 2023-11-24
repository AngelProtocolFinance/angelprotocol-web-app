import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { AuthenticatedUser } from "types/auth";
import Icon from "components/Icon";
import { groups } from "constants/auth";
import { appRoutes } from "constants/routes";

type Props = {
  classes?: string;
  signOut(): void;
  user: AuthenticatedUser;
};
export default function Menu({ classes = "", user, signOut }: Props) {
  return (
    <Popover.Panel
      className={`${classes} shadow-xl bg-white dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-3 border-b border-prim">
        Welcome, {user.firstName || user.email}!
      </p>

      <div className="w-64 min-h-[5rem] px-3 pb-3">
        <Link
          to={appRoutes.donations}
          className="mt-3 hover:text-orange text-sm flex items-center gap-2"
        >
          <Icon type="Money" className="text-lg" />
          <span>My Donations</span>
        </Link>
        <div className="mt-2 text-sm flex items-center gap-2 text-gray">
          <Icon type="User" className="text-lg" />
          <span>My profile (coming soon!)</span>
        </div>

        {/** TODO: temp hidden until user endowments are in jwt claim  */}
        <div className="hidden p-4 border-t border-prim">
          <Link
            to={`${appRoutes.admin}/${1}`}
            className="text-orange hover:text-orange-l2 text-sm uppercase"
          >
            Endowment Dashboard
          </Link>
        </div>

        <div className="hidden [&:has(div)]:block mt-6">
          <h5 className="uppercase text-sm text-gray-d1">BG Admin</h5>
          <div className="empty:hidden p-4">
            {user.groups.includes(groups["ap-admin"]) && (
              <Link
                to={appRoutes.applications}
                className="text-orange hover:text-orange-l2 text-sm uppercase"
              >
                Applications Review
              </Link>
            )}
          </div>
        </div>
      </div>
      <button
        disabled={user.isSigningOut}
        type="button"
        onClick={signOut}
        className="btn-orange rounded-none w-full p-3 text-sm"
      >
        Sign out
      </button>
    </Popover.Panel>
  );
}
