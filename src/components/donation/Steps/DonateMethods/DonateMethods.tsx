import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import Donater from "../Donater";
import DAFDirect from "./DAFDirect";
import Stocks from "./Stocks";
import Stripe from "./Stripe";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};

const tabClasses = (selected: boolean) =>
  `${selected ? "bg-white font-semibold" : ""} px-6 py-2 text-sm`;

export default function DonateMethods({ donaterConfig, state }: Props) {
  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-[auto_1fr] content-start mt-2 bg-white"
      defaultIndex={state.details?.method === "crypto" ? 1 : 0}
    >
      <Tab.List className="grid content-start container bg-gray-l5">
        <Tab className={({ selected }) => tabClasses(selected)}>Cards</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Stocks</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>DAF</Tab>
      </Tab.List>
      <Tab.Panels as="div" className="p-4">
        <Tab.Panel>
          <Stripe
            widgetConfig={donaterConfig}
            advanceOptDisplay={
              donaterConfig?.advancedOptionsDisplay ?? "collapsed"
            }
            state={state}
          />
        </Tab.Panel>
        <Tab.Panel>
          <Donater {...state} config={donaterConfig} />
        </Tab.Panel>
        <Tab.Panel>
          <Stocks state={state} />
        </Tab.Panel>
        <Tab.Panel>
          <DAFDirect />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
