import Icon from "components/Icon";
import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  title: string;
  classes?: string;
}>;

export default function Container({ title, children, classes = "" }: Props) {
  const [isOpen, setOpen] = useState(true);

  return (
    <div
      className={`w-full border border-gray-l4 rounded dark:bg-blue-d6 divide-y divide-gray-l4 ${classes}`}
    >
      <div className="flex items-center gap-x-3 p-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center p-px w-6 h-6 border border-gray-l4 rounded"
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
