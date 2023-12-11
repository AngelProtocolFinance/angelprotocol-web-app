import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import Donater from "../Donater";
import DAFDirect from "./DAFDirect";
import PayPal from "./PayPal";
import Stocks from "./Stocks";
import Stripe from "./Stripe";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "border-orange text-orange"
      : "border-gray-l3 dark:border-bluegray"
  } uppercase p-2 border-b-4 hover:text-orange-l1 hover:border-orange-l1`;

export default function DonateMethods({ donaterConfig, state }: Props) {
  return (
    <Tab.Group
      as="div"
      className="grid content-start mt-2"
      defaultIndex={state.details?.method === "crypto" ? 1 : 0}
    >
      <Tab.List className="grid grid-cols-2 sm:grid-cols-5 mb-6">
        <Tab className={({ selected }) => tabClasses(selected)}>
          Credit/Debit
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Stocks</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>DAF</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>PayPal</Tab>
      </Tab.List>
      <Tab.Panels>
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
        <Tab.Panel>
          <PayPal />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
