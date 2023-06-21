import { TPermission } from "../types";

export default function LockButton({ modifiable }: TPermission) {
  if (modifiable) return <></>;

  return (
    <button
      disabled={true}
      className="text-gray-d1 dark:text-gray uppercase text-xs bg-gray-l2 dark:bg-blue-gray-d2 rounded-sm px-2 py-1"
    >
      Locked
    </button>
  );
}
