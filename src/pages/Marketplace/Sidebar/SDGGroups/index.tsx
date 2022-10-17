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
