import { Disclosure } from "@headlessui/react";
import { FormMilestone } from "../types";
import { DrawerIcon } from "components/Icon";

export default function Milestone({ milestone_title }: FormMilestone) {
  return (
    <Disclosure
      as="div"
      className="relative py-3 px-4 rounded border border-prim text-center dark:bg-blue-d7"
    >
      <span className="text-xl font-bold font-heading">{milestone_title}</span>
      <Disclosure.Button className="absolute right-4 top-1/2 -translate-y-1/2">
        {({ open }) => <DrawerIcon isOpen={open} size={24} />}
      </Disclosure.Button>
    </Disclosure>
  );
}
