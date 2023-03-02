import { PropsWithChildren } from "react";

export default function Header(props: PropsWithChildren) {
  return (
    <p className="text-xs font-heading uppercase border-b border-gray-l4 dark:border-bluegray-d1 mt-4 first:mt-0 mb-1 p-1 pb-1.5">
      {props.children}
    </p>
  );
}
