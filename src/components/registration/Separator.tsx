export function Separator({ classes = "" }: { classes?: string }) {
  return (
    <p
      className={`relative h-px grid place-items-center bg-gray-d1 dark:bg-gray ${classes}`}
    >
      <span className="bg-gray-l5 dark:bg-blue-d4 p-3 absolute text-gray-d1 dark:text-gray text-sm">
        OR
      </span>
    </p>
  );
}
