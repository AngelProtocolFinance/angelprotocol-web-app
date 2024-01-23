import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import Icon from "components/Icon/Icon";
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
  `${
    selected ? "bg-white font-semibold" : ""
  } text-sm p-4 focus:outline-none w-40 flex items-center gap-2`;

export default function DonateMethods({ donaterConfig, state }: Props) {
  return (
    <Tab.Group
      vertical
      as="div"
      className="grid grid-cols-[auto_1fr] container"
      defaultIndex={state.details?.method === "crypto" ? 1 : 0}
    >
      <Tab.List className="grid content-start bg-blue-l4 divide-y divide-white">
        <Tab className={({ selected }) => tabClasses(selected)}>Card</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Stocks</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>DAF</Tab>
      </Tab.List>
      <Tab.Panels as="div" className="p-8">
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
