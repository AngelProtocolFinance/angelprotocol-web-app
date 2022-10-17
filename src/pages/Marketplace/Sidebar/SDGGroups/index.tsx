import { useState } from "react";
import { Drawer } from "../common";
import Group from "./Group";

export default function SDGGroups() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="px-3 pt-3">
      <Drawer
        title="Sdg group"
        isOpen={isOpen}
        toggle={toggle}
        classes="mb-3"
      />
      {isOpen && (
        <div className="grid gap-y-1">
          <Group
            title="SDG Group 1 : Reducing overall inequality"
            num={1}
            members={[1, 2, 10]}
          />
          <Group
            title="SDG Group 2 : Access to safe conditions"
            num={2}
            members={[3, 6, 7]}
          />
          <Group
            title="SDG Group 3 : Sustainable growth"
            num={3}
            members={[8, 9, 16]}
          />
          <Group
            title="SDG Group 4 : Equality through education"
            num={4}
            members={[4, 5]}
          />
          <Group
            title="SDG Group 5 : Sustainable partnerships"
            num={5}
            members={[11, 12, 17]}
          />
          <Group
            title="SDG Group 6 : Holistic climate action"
            num={6}
            members={[13, 14, 15]}
          />
        </div>
      )}
    </div>
  );
}
