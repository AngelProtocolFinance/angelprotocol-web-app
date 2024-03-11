import Icon from "components/Icon";
import { ReactNode, useState } from "react";

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
    <div
      className={`grid ${classes} border border-gray-l4 rounded overflow-clip`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-blue-l5 dark:bg-blue-d7">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-gray-l4 h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && (
        <div className="grid p-6 pt-4 font-heading border-t border-gray-l4">
          <p className="text-xs uppercase font-bold mb-2">Split</p>
          {splitComponent}
        </div>
      )}
    </div>
  );
}
