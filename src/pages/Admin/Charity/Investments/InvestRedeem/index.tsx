import { Tab } from "@headlessui/react";
import Invest from "./Invest";
import Redeem from "./Redeem";

const tabs = ["invest", "redeem"];
export default function InvestRedeem() {
  return (
    <div className="grid content-start text-zinc-50/80">
      <h3 className="uppercase font-heading text-2xl font-bold">
        Invest and redeem from vaults
      </h3>
      <p className="mb-6">
        manage your endowment investments by moving funds to/from vaults and the
        free tokens on hand account
      </p>
      <Tab.Group
        as="div"
        className="bg-zinc-50/5 shadow-inner p-3 rounded-md grid grid-rows-[auto_1fr]"
      >
        <Tab.List className="flex bg-zinc-50 justify-self-center text-zinc-600 rounded-sm overflow-hidden">
          {tabs.map((t) => (
            <Tab
              key={t}
              className={({ selected }) =>
                `w-32 py-1 uppercase font-heading text-sm ${
                  selected ? "bg-angel-blue text-white rounded-sm" : ""
                }`
              }
            >
              {t}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Invest />
          </Tab.Panel>
          <Tab.Panel>
            <Redeem />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
