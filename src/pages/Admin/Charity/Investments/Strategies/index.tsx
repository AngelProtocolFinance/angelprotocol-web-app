import { Tab } from "@headlessui/react";
import { AccountType } from "types/contracts";
import Allocations from "./Allocations";

const tabs: AccountType[] = ["locked", "liquid"];
const panels = tabs;

export default function Strategies() {
  return (
    <Tab.Group
      as="div"
      className="grid grid-rows-[auto_1fr] border border-zinc-50/30 p-3"
    >
      <Tab.List className="flex justify-self-center bg-zinc-50/80 rounded-sm overflow-hidden">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              `w-32 ${
                selected ? "bg-angel-blue text-white" : ""
              } text-center uppercase text-sm font-heading py-2`
            }
          >
            {tab === "liquid" ? "Current" : "Endowment"}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {panels.map((type) => (
          <Tab.Panel key={type} className="grid grid-cols-2 rounded-sm gap-3">
            <Allocations type={type} readonly />
            <Allocations type={type} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
