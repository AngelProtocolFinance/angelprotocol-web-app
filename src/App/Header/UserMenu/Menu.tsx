import { MenuItem } from "@headlessui/react";
import Icon from "components/Icon";
import { groups } from "constants/auth";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import type { AuthenticatedUser } from "types/auth";
import { Bookmarks } from "./Bookmarks";
import { Organizations } from "./Organizations";

type Props = {
  classes?: string;
  signOut(): void;
  user: AuthenticatedUser;
};
export default function Menu({ user, signOut, classes }: Props) {
  return (
    <div className={`${classes} text-navy-l1`}>
      <p className="text-sm p-3 bg-blue-l4">
        Welcome, {user.firstName || user.email}!
      </p>
      <div className="w-64 min-h-[5rem] p-5">
        <MenuItem
          as={Link}
          to={`${appRoutes.user_dashboard}/donations`}
          className=" hover:text-blue-d1 text-sm flex items-center gap-2"
        >
          <Icon type="DollarCircle" size={18} />
          <span>My Donations</span>
        </MenuItem>
        <Organizations userId={user.email} classes="mt-6" />
        <Bookmarks classes="mt-6" />
        <div className="hidden [&:has(a)]:block mt-6">
          <h5 className="uppercase text-xs text-navy-l1 mb-1">BG Admin</h5>
          {user.groups.includes(groups["ap-admin"]) && (
            <MenuItem
              as={Link}
              to={appRoutes.applications}
              className="hover:text-blue-d1 text-sm flex items-center gap-1"
            >
              <Icon type="SecurityScan" size={18} />
              <span>Applications Dashboard</span>
            </MenuItem>
          )}
          {user.groups.includes(groups["ap-admin"]) && (
            <MenuItem
              as={Link}
              to={appRoutes.banking_applications}
              className="hover:text-blue-d1 text-sm flex items-center gap-1 mt-1"
            >
              <Icon type="SecurityScan" size={18} />
              <span>Banking applications</span>
            </MenuItem>
          )}
        </div>
      </div>
      <button
        disabled={user.isSigningOut}
        type="button"
        onClick={signOut}
        className="btn-blue rounded-none w-full p-3 text-sm mt-4"
      >
        Log out
      </button>
    </div>
  );
}
