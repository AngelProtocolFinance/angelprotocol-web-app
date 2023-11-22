import { SignedInUser } from "slices/auth";

type Props = {
  classes?: string;
  signOut(): void;
  user: SignedInUser;
};
export default function Menu({ classes = "", user, signOut }: Props) {
  return (
    <div
      className={`${classes} bg-white dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-2 text-gray-d1 dark:text-gray">{user.id}</p>
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
