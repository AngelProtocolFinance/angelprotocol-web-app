type Props = {
  classes?: string;
  isLoading: boolean;
  signOut(): void;
  userEmail: string;
};
export default function Menu({
  classes = "",
  isLoading,
  userEmail,
  signOut,
}: Props) {
  return (
    <div
      className={`${classes} bg-white dark:bg-blue-d6 w-max rounded overflow-hidden`}
    >
      <p className="text-sm p-2 text-gray-d1 dark:text-gray">{userEmail}</p>
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
