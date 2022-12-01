import { PropsWithChildren } from "react";
import Icon from "components/Icon";

export default function Warning({
  classes = "",
  children,
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`${classes} p-2 bg-orange-l6 dark:bg-blue-d4 border border-orange-l3 dark:border-bluegray rounded-md text-orange-d1 dark:text-orange-l3 text-xs`}
    >
      <Icon type="Info" className="inline relative bottom-0.5 mr-1" />
      {children}
    </div>
  );
}
