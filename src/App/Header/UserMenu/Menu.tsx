import { WithAuthenticatorProps } from "@aws-amplify/ui-react";

type Props = Required<WithAuthenticatorProps> & { classes?: string };
export default function Menu({ classes = "", user, signOut }: Props) {
  return (
    <div
      className={`${classes} bg-white dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-2 text-gray-d1 dark:text-gray">
        {user?.attributes?.email}
      </p>
      <div className=""></div>
      <button
        type="button"
        onClick={signOut}
        className="btn-orange rounded-none w-full py-1 px-2 tex-sm"
      >
        sign out
      </button>
    </div>
  );
}
