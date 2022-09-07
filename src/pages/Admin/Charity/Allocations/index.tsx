import { Tab } from "@headlessui/react";

const tabs = ["liquid", "locked"];
export default function Allocations() {
  return (
    <div className="grid content-start mt-6">
      <h3 className="uppercase text-2xl font-extrabold text-zinc-50/80">
        Donation Split
      </h3>
      <p className="text-zinc-50/80">[ add split visual ]</p>

      <h3 className="mt-8 uppercase text-2xl font-extrabold text-zinc-50/80">
        Donation allocation
      </h3>
      <p className="text-zinc-50/80">
        how funds received in each account is allocated
      </p>
      <Tab.Group as="div" className="mt-2 mb-4">
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
          <Tab.Panel>hello</Tab.Panel>
          <Tab.Panel>world</Tab.Panel>
          {/* <Account type="liquid" />
        <Account type="locked" /> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
