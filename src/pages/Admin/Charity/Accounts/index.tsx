import { Tab } from "@headlessui/react";
import Account from "./Account";

const tabs = ["liquid", "locked"];

export default function Accounts() {
  return (
    <Tab.Group as="div" className="grid content-start mt-6">
      <Tab.List className="flex justify-self-start bg-zinc-50/20 rounded-sm overflow-hidden">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              `uppercase font-heading focus:outline-none px-2 py-1 text-sm font-bold w-24 ${
                selected ? "bg-zinc-50/60 text-zinc-700" : "text-white"
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="p-3 shadow-inner bg-zinc-50/5 rounded-md">
        <Account type="liquid" />
        <Account type="locked" />
      </Tab.Panels>
    </Tab.Group>
  );
}
