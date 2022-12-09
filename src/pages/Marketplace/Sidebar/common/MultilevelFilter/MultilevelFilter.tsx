import { useState } from "react";
import { Drawer, GroupProps } from "..";
import Group from "./Group";

type Props<T> = {
  key: string | number;
  label: string;
  groups: GroupProps<T>[];
  onChange: (options: T[]) => void;
};

export default function MultilevelFilter<T>(props: Props<T>) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="px-3 pt-3">
      <Drawer isOpen={isOpen} toggle={toggle} classes="mb-3">
        <span className="font-bold text-xs font-heading">{props.label}</span>
      </Drawer>
      {isOpen && (
        <div className="grid gap-y-1 max-h-[30rem] overflow-y-auto scroller">
          {props.groups.map((group) => (
            <Group
              key={group.key}
              label={group.label}
              options={group.options}
              onChange={props.onChange}
              selectedValues={group.selectedValues}
            />
          ))}
        </div>
      )}
    </div>
  );
}
