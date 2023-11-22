type Props = {
  classes?: string;
  signOut(): void;
  userEmail: string;
};
export default function Menu({ classes = "", userEmail, signOut }: Props) {
  return (
    <div
      className={`${classes} bg-white dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-2 text-gray-d1 dark:text-gray">{userEmail}</p>
      <button
        type="button"
        onClick={signOut}
        className="btn-orange rounded-none w-full py-1 px-2 tex-sm"
      >
        Sign out
      </button>
    </div>
  );
}
