import { Popover } from "@headlessui/react";
import Icon from "components/Icon";
import { groups } from "constants/auth";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { AuthenticatedUser } from "types/auth";
import EndowmentLink from "./EndowmentLink";

type Props = {
  classes?: string;
  signOut(): void;
  user: AuthenticatedUser;
};
export default function Menu({ classes = "", user, signOut }: Props) {
  return (
    <Popover.Panel
      className={`${classes} shadow-xl bg-gray-l6 dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-3 bg-orange-l6 border-b border-gray-l4">
        Welcome, {user.firstName || user.email}!
      </p>

      <div className="w-64 min-h-[5rem] p-3">
        <Link
          to={appRoutes.donations}
          className=" hover:text-orange text-sm flex items-center gap-2"
        >
          <Icon type="Money" className="text-lg" />
          <span>My Donations</span>
        </Link>
        {/*<div className="mt-2 text-sm flex items-center gap-2 text-gray">
          <Icon type="User" className="text-lg" />
          <span>My profile (coming soon!)</span>
        </div>*/}

        <div className="hidden [&:has(a)]:grid mt-6 gap-2">
          <h5 className="uppercase text-xs text-navy-l1 -mb-1">
            My Organizations
          </h5>
          {user.endowments.map((endowId) => (
            <EndowmentLink key={endowId} endowId={endowId} />
          ))}
        </div>

        <div className="hidden [&:has(a)]:block mt-6">
          <h5 className="uppercase text-xs text-navy-l1 mb-1">BG Admin</h5>
          {user.groups.includes(groups["ap-admin"]) && (
            <Link
              to={appRoutes.applications}
              className="hover:text-orange text-sm flex items-center gap-1"
            >
              <Icon type="SecurityScan" size={22} />
              <span>Applications Dashboard</span>
            </Link>
          )}
          {user.groups.includes(groups["ap-admin"]) && (
            <Link
              to={appRoutes.banking_applications}
              className="hover:text-orange text-sm flex items-center gap-1 mt-1"
            >
              <Icon type="SecurityScan" size={22} />
              <span>Banking applications</span>
            </Link>
          )}
        </div>
      </div>
      <button
        disabled={user.isSigningOut}
        type="button"
        onClick={signOut}
        className="btn-orange rounded-none w-full p-3 text-sm mt-4"
      >
        Log out
      </button>
    </Popover.Panel>
  );
}
