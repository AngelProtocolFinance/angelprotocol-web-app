import { useState } from "react";
import { Drawer } from "../common";
import Group from "./Group";

export default function SDGGroups() {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="px-3 pt-3">
      <Drawer isOpen={isOpen} toggle={toggle} classes="mb-3">
        <span className="font-bold text-xs font-heading">Sdg group</span>
      </Drawer>
      {isOpen && (
        <div className="grid gap-y-1 max-h-[30rem] overflow-y-auto scroller">
          <Group
            title="Reducing overall inequality"
            num={1}
            members={[1, 2, 10]}
          />
          <Group
            title="Access to safe conditions"
            num={2}
            members={[3, 6, 7]}
          />
          <Group title="Sustainable growth" num={3} members={[8, 9, 16]} />
          <Group title="Equality through education" num={4} members={[4, 5]} />
          <Group
            title="Sustainable partnerships"
            num={5}
            members={[11, 12, 17]}
          />
          <Group
            title="Holistic climate action"
            num={6}
            members={[13, 14, 15]}
          />
        </div>
      )}
    </div>
  );
}
