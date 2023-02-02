import { Tab } from "@headlessui/react";
import { AccountType } from "types/contracts";
import Allocations from "./Allocations";

const tabs: AccountType[] = ["locked", "liquid"];

export default function Settings() {
  return (
    <div className="font-work">
      <h3 className="uppercase font-heading text-2xl font-bold">
        Auto-investment strategies
      </h3>
      <p className="mb-6 mt-4">
        Define and manage your endowment auto-invest strategies which are used
        to invest all incoming donations into the vaults of your choice. Any
        strategies with less than 100% allocations to vaults will have remaining
        USDC allocated to the free tokens on hand bucket.
      </p>
      <Tab.Group
        as="div"
        className="grid content-start border bg-orange-l6 dark:bg-blue-d6 border-prim p-3"
      >
        <Tab.List className="flex justify-self-center border border-prim rounded p-2 gap-1 overflow-hidden ">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-32 rounded ${
                  selected ? "bg-blue text-white" : ""
                } text-center uppercase text-sm font-heading py-2`
              }
            >
              {tab === "liquid" ? "Current" : "Endowment"}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((type) => (
            <Tab.Panel key={type} className="grid md:grid-cols-2 rounded gap-3">
              <Allocations type={type} readonly classes="hidden md:grid" />
              <Allocations type={type} classes="grid" />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
