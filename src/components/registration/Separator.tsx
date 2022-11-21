import { PropsWithChildren } from "react";

export function Separator({
  classes = "",
  children,
}: PropsWithChildren<{ classes?: string }>) {
  /**before:bg-red before:mr-2 */
  /**after:bg-red after:mr-l */
  return (
    <p
      className={`flex items-center text-gray-d1 dark:text-gray text-sm before:content-[''] before:h-px before:w-full after:content-[''] after:h-px after:w-full before:bg-gray-d1 after:bg-gray-d1 before:dark:bg-gray after:dark:bg-gray ${classes}`}
    >
      {children}
    </p>
    // <p
    //   className={`relative h-px grid place-items-center bg-gray-d1 dark:bg-gray ${classes}`}
    // >
    //   <span className="bg-gray-l5 dark:bg-blue-d4 p-3 absolute text-gray-d1 dark:text-gray text-sm">
    //     OR
    //   </span>
    // </p>
  );
}
