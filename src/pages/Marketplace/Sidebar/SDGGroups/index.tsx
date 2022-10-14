import { useState } from "react";
import Icon from "components/Icon";
import Group from "./Group";

export default function SDGGroups() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-3 pt-3">
      <button
        onClick={() => {
          setIsOpen((p) => !p);
        }}
        className="mb-3 focus:outline-none w-full font-heading uppercase text-sm flex items-center justify-between"
      >
        <span className="text-xs font-semibold">SDG Group</span>
        <Icon type="Down" />
      </button>
      {isOpen && (
        <div className="grid gap-y-2">
          <Group num={1} members={[0, 1, 2, 3]} />
          <Group num={2} members={[4, 5, 6, 7]} />
          <Group num={3} members={[8, 9, 10, 11]} />
          <Group num={4} members={[12, 13, 14, 15]} />
          <Group num={5} members={[16, 17]} />
        </div>
      )}
    </div>
  );
}
