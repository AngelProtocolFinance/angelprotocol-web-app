import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import { appRoutes } from "constants/routes";

type Props = Required<WithAuthenticatorProps> & {
  classes?: string;
  isLoading: boolean;
};

export default function Menu({
  classes = "",
  isLoading,
  user,
  signOut,
}: Props) {
  return (
    <div
      className={`${classes} bg-white dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-2 text-gray-d1 dark:text-gray">
        Welcome, {user?.attributes?.given_name}!
      </p>
      <Link to={appRoutes.donations}>My Donations</Link>
      {user.attributes?.endowments ? (
        <Link to={`${appRoutes.admin}/${user?.attributes?.endowments}`}>
          Endowment Dashboard
        </Link>
      ) : (
        <></>
      )}
      {user.attributes?.admin ? (
        <Link to={appRoutes.applications}>Applications Review</Link>
      ) : (
        <></>
      )}
      <button
        disabled={isLoading}
        type="button"
        onClick={signOut}
        className="btn-orange rounded-none w-full py-1 px-2 tex-sm"
      >
        Sign out
      </button>
    </div>
  );
}
