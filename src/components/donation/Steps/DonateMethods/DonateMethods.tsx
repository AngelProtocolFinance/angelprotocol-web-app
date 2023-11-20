import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import Donater from "../Donater";
import Other from "./Other";
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
      <Tab.List as="div" className="grid grid-cols-3 mb-6">
        <Tab className={({ selected }) => tabClasses(selected)}>
          Credit/Debit
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Other</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="grid">
          <Stripe
            widgetConfig={donaterConfig}
            advanceOptDisplay={
              donaterConfig?.advancedOptionsDisplay ?? "collapsed"
            }
            state={state}
          />
        </Tab.Panel>
        <Tab.Panel className="grid">
          <Donater {...state} config={donaterConfig} />
        </Tab.Panel>
        <Tab.Panel className="grid">
          <Other />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
