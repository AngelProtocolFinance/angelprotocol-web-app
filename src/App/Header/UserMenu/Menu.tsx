import Icon from "components/Icon";
import { Separator } from "components/Separator";
import { groups } from "constants/auth";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import type { AuthenticatedUser } from "types/auth";
import { Bookmarks } from "./Bookmarks";
import EndowmentLink from "./EndowmentLink";

type Props = {
  classes?: string;
  signOut(): void;
  user: AuthenticatedUser;
};
export default function Menu({ user, signOut }: Props) {
  return (
    <>
      <Separator classes="my-3 text-navy-l1" />
      <p className="text-sm p-3 bg-blue-l4">
        Welcome, {user.firstName || user.email}!
      </p>
      <div className="w-64 min-h-[5rem] p-3">
        <Link
          to={`${appRoutes.user_dashboard}/donations`}
          className=" hover:text-blue-d1 text-sm flex items-center gap-2"
        >
          <Icon type="Money" className="text-lg" />
          <span>My Donations</span>
        </Link>
        <div className="hidden [&:has(a)]:grid mt-6 gap-2">
          <h5 className="uppercase text-xs text-navy-l1 -mb-1">
            My Organizations
          </h5>
          {user.endowments.map((endowId) => (
            <EndowmentLink key={endowId} endowId={endowId} route="admin" />
          ))}
        </div>
        <Bookmarks classes="mt-6" />
        <div className="hidden [&:has(a)]:block mt-6">
          <h5 className="uppercase text-xs text-navy-l1 mb-1">BG Admin</h5>
          {user.groups.includes(groups["ap-admin"]) && (
            <Link
              to={appRoutes.applications}
              className="hover:text-blue-d1 text-sm flex items-center gap-1"
            >
              <Icon type="SecurityScan" size={22} />
              <span>Applications Dashboard</span>
            </Link>
          )}
          {user.groups.includes(groups["ap-admin"]) && (
            <Link
              to={appRoutes.banking_applications}
              className="hover:text-blue-d1 text-sm flex items-center gap-1 mt-1"
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
        className="btn-blue rounded-none w-full p-3 text-sm mt-4"
      >
        Log out
      </button>
    </>
  );
}
