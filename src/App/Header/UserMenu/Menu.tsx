import { WithAuthenticatorProps } from "@aws-amplify/ui-react";

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
      className={`${classes} bg-white dark:bg-blue-d3 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-2 text-gray-d1 dark:text-gray">
        {user?.attributes?.email}
      </p>
      <button
        disabled={isLoading}
        type="button"
        onClick={signOut}
        className="btn-red rounded-none w-full py-1 px-2 tex-sm"
      >
        Sign out
      </button>
    </div>
  );
}
