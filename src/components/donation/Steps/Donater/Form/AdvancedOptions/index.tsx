import { useEffect, useState } from "react";
import Icon from "components/Icon";
import Split from "./Split";

type Props = { classes?: string; unfold?: boolean };

export default function AdvancedOptions({ classes = "", unfold }: Props) {
  const [isOpen, setIsOpen] = useState(unfold);

  useEffect(() => {
    if (isOpen !== unfold) {
      setIsOpen(unfold);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unfold]);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={`grid ${classes} border border-gray-l2 dark:border-bluegray  rounded overflow-clip`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-orange-l6 dark:bg-blue-d7">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-gray-l2 dark:border-bluegray h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && <Split />}
    </div>
  );
}
