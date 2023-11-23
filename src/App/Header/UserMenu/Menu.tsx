import { Link } from "react-router-dom";
import { AuthenticatedUser } from "slices/auth";
import { appRoutes } from "constants/routes";

type Props = {
  classes?: string;
  signOut(): void;
  user: AuthenticatedUser;
};
export default function Menu({ classes = "", user, signOut }: Props) {
  return (
    <div
      className={`${classes} bg-white dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-2 text-gray-d1 dark:text-gray">
        {user?.attributes?.given_name
          ? `Welcome, ${user.attributes.given_name}!`
          : user?.attributes?.email
          ? `Welcome, ${user.attributes.email}!`
          : "Welcome!"}
      </p>
      <div className="empty:hidden p-4 border-t border-prim">
        <Link 
          to={appRoutes.donations}
          className="text-orange hover:text-orange-l2 text-sm uppercase"
        >
          My Donations
        </Link>
      </div>
      {user.attributes?.endowments && (
        <div className="empty:hidden p-4 border-t border-prim">
          <Link 
            to={`${appRoutes.admin}/${user.attributes.endowments}`}
            className="text-orange hover:text-orange-l2 text-sm uppercase"
           >
            Endowment Dashboard
          </Link>
        </div>
      )}
      <div className="empty:hidden p-4 border-t border-prim">
        {user.credentials.includes("ap") && (
          <Link
            to={appRoutes.applications}
            className="text-orange hover:text-orange-l2 text-sm uppercase"
          >
            Applications Review
          </Link>
        )}
      </div>
      <button
        disabled={user.isSigningOut}
        type="button"
        onClick={signOut}
        className="btn-orange rounded-none w-full py-1 px-2 tex-sm"
      >
        Sign out
      </button>
    </div>
  );
}
