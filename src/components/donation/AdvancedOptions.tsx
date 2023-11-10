import { ReactNode, useState } from "react";
import Icon from "components/Icon";

export type AdvancedOptionsDisplay = "hidden" | "expanded" | "collapsed";
type Props = {
  display: AdvancedOptionsDisplay;
  classes?: string;
  splitComponent: ReactNode;
};

export default function AdvancedOptions({
  classes = "",
  display,
  splitComponent,
}: Props) {
  const [isOpen, setIsOpen] = useState(display === "expanded");
  const toggle = () => setIsOpen((prev) => !prev);

  if (display === "hidden") return null;

  return (
    <div className={`grid ${classes} border border-prim rounded overflow-clip`}>
      <div className="flex items-center justify-between px-4 py-2 bg-red-l6 dark:bg-blue-d3">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-prim h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && (
        <div className="grid p-6 pt-4 font-heading border-t border-prim">
          <p className="text-xs uppercase font-bold mb-2">Split</p>
          {splitComponent}
        </div>
      )}
    </div>
  );
}
