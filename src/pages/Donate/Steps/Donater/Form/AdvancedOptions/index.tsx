import { Popover } from "@headlessui/react";
import { useState } from "react";
import Icon, { DrawerIcon } from "components/Icon";
import Split from "./Split";

type Props = {
  classes?: string;
};

export default function AdvancedOptions({ classes = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={`grid ${classes} border border-gray-l2 rounded overflow-clip`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-orange-l5">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advance Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-gray-l2 h-full aspect-square rounded grid place-items-center"
        >
          <DrawerIcon isOpen={isOpen} size={20} />
        </button>
      </div>
      {isOpen && <Split />}
    </div>
  );
}
