import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import Donater from "../Donater";
import Stripe from "./Stripe";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};
export default function DonateMethods({ donaterConfig, state }: Props) {
  return (
    <Tab.Group
      as="div"
      className="grid content-start mt-2"
      defaultIndex={state.details?.method === "crypto" ? 1 : 0}
    >
      <Tab.List as="div" className="grid grid-cols-2 mb-6">
        <Tab
          className={({ selected }) =>
            `${
              selected ? "border-orange" : "border-gray-l3 dark:border-bluegray"
            } uppercase p-2 border-b-4 hover:text-orange-l1`
          }
        >
          Credit/Debit
        </Tab>
        <Tab
          className={({ selected }) =>
            `${
              selected ? "border-orange" : "border-gray-l3 dark:border-bluegray"
            } uppercase p-2 border-b-4 hover:text-orange-l1`
          }
        >
          Crypto
        </Tab>
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
      </Tab.Panels>
    </Tab.Group>
  );
}
