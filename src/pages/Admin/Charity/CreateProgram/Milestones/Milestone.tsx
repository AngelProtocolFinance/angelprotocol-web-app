import { Disclosure } from "@headlessui/react";
import { FormMilestone } from "../types";
import { DrawerIcon } from "components/Icon";

export default function Milestone({ milestone_title }: FormMilestone) {
  return (
    <Disclosure
      as="div"
      className="border border-prim rounded dark:bg-blue-d7 overflow-hidden"
    >
      <div className="relative py-3 px-4 text-center">
        <span className="text-xl font-bold font-heading">
          {milestone_title}
        </span>
        <Disclosure.Button className="absolute right-4 top-1/2 -translate-y-1/2">
          {({ open }) => <DrawerIcon isOpen={open} size={24} />}
        </Disclosure.Button>
      </div>

      <Disclosure.Panel
        as="div"
        className={({ open }) =>
          `${open ? "border-t border-prim" : ""} dark:bg-blue-d5`
        }
      >
        hello world
      </Disclosure.Panel>
    </Disclosure>
  );
}
