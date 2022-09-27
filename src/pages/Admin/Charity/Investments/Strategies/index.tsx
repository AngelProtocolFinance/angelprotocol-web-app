import { Tab } from "@headlessui/react";
import { AccountType } from "types/contracts";
import Allocations from "./Allocations";

const tabs: AccountType[] = ["locked", "liquid"];
/**
 *
 *
 */

export default function Strategies() {
  return (
    <div className="text-zinc-50/80">
      <h3 className="uppercase font-heading text-2xl font-bold">
        Auto-investment strategies
      </h3>
      <p className="mb-6">
        Define and manage your endowment auto-invest strategies which are used
        to invest all incoming donations into the vaults of your choice. Any
        strategies with less than 100% allocations to vaults will have remaining
        USDC allocated to the free tokens on hand bucket.
      </p>
      <Tab.Group
        as="div"
        className="grid content-start border border-zinc-50/30 p-3"
      >
        <Tab.List className="flex justify-self-center bg-zinc-50/80 rounded-sm overflow-hidden">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-32 ${
                  selected ? "bg-angel-blue text-white" : "text-zinc-600"
                } text-center uppercase text-sm font-heading py-2`
              }
            >
              {tab === "liquid" ? "Current" : "Endowment"}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((type) => (
            <Tab.Panel
              key={type}
              className="grid md:grid-cols-2 rounded-sm gap-3"
            >
              <Allocations type={type} readonly classes="hidden md:grid" />
              <Allocations type={type} classes="grid" />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
