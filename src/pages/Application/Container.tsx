import { PropsWithChildren, useState } from "react";
import Icon from "components/Icon";

type Props = PropsWithChildren<{
  title: string;
  classes?: string;
}>;

export default function Container({ title, children, classes = "" }: Props) {
  const [isOpen, setOpen] = useState(true);

  return (
    <div
      className={`w-full border border-gray-l3 dark:border-blue-gray rounded dark:bg-blue-d6 divide-y divide-prim ${classes}`}
    >
      <div className="flex items-center gap-x-3 p-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center p-px w-6 h-6 border border-gray-l3 dark:border-blue-gray rounded"
          aria-label="toggle section content's visibility"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} />
        </button>
        <p className="uppercase text-sm font-bold">{title}</p>
      </div>
      {isOpen && children}
    </div>
  );
}
