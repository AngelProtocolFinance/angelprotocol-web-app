import { Tab } from "@headlessui/react";
import { useGetter } from "store/accessors";
import DonaterSample from "./DonaterSample";

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "border-orange text-orange"
      : "border-gray-l3 dark:border-bluegray"
  } uppercase p-2 border-b-4 hover:text-orange-l1 hover:border-orange-l1`;

export default function DonateMethods({ classes = "" }) {
  const widgetConfig = useGetter((state) => state.widget);

  return (
    <Tab.Group as="div" className="grid content-start mt-2">
      <Tab.List className="grid grid-cols-2 sm:grid-cols-4 mb-6">
        <Tab className={({ selected }) => tabClasses(selected)}>
          Credit/Debit
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Stocks</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>DAF</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <DonaterSample {...widgetConfig} />
        </Tab.Panel>
        <Tab.Panel>
          <div>stripe sample</div>
        </Tab.Panel>
        <Tab.Panel>
          <div>stocks sample</div>
        </Tab.Panel>
        <Tab.Panel>
          <div>DAF direct sample</div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
