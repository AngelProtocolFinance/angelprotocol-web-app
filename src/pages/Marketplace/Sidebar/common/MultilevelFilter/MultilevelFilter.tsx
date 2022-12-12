import { useState } from "react";
import { Drawer, GroupProps } from "..";
import Group from "./Group";

type Props<T> = {
  label: string;
  groups: GroupProps<T>[];
  hideBottomBorder?: boolean;
};

export function MultilevelFilter<T>(props: Props<T>) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={`grid gap-6 px-2 py-3 ${
        props.hideBottomBorder
          ? ""
          : "border-b border-gray-l2 dark:border-bluegray"
      }`}
    >
      <Drawer isOpen={isOpen} toggle={toggle}>
        <span className="font-bold text-xs font-heading">{props.label}</span>
      </Drawer>
      {isOpen && (
        <div className="flex flex-col gap-4 max-h-96 overflow-y-auto scroller">
          {props.groups.map((group) => (
            <Group
              key={group.key}
              label={group.label}
              options={group.options}
              onChange={group.onChange}
              selectedValues={group.selectedValues}
            />
          ))}
        </div>
      )}
    </div>
  );
}
