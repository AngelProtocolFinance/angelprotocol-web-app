import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import Crypto from "./Crypto";
import DAFDirect from "./DAFDirect";
import Stocks from "./Stocks";
import Stripe from "./Stripe";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "font-semibold bg-blue @md:bg-white text-white @md:text-black"
      : ""
  } text-sm text-left p-2 @md:p-4 focus:outline-none @md:w-40 rounded border border-prim @md:border-none`;

export default function DonateMethods({ donaterConfig, state }: Props) {
  return (
    <Tab.Group
      vertical
      as="div"
      className="grid @md:grid-cols-[auto_1fr] container"
      defaultIndex={state.details?.method === "crypto" ? 1 : 0}
    >
      <Tab.List className="grid grid-cols-2 gap-2 @md:gap-0 p-4 @md:p-0 @md:grid-cols-1 content-start @md:bg-blue-l4 @md:divide-y @md:divide-white">
        <Tab className={({ selected }) => tabClasses(selected)}>Card</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Stocks</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>DAF</Tab>
      </Tab.List>
      <Tab.Panels as="div" className="p-8">
        <Tab.Panel>
          <Stripe
            recipient={state.recipient}
            step={state.step}
            details={
              state.details?.method === "stripe" ? state.details : undefined
            }
            widgetConfig={donaterConfig}
            advanceOptDisplay={
              donaterConfig?.advancedOptionsDisplay ?? "collapsed"
            }
          />
        </Tab.Panel>
        <Tab.Panel>
          <Crypto
            recipient={state.recipient}
            step={state.step}
            details={
              state.details?.method === "crypto" ? state.details : undefined
            }
            config={donaterConfig}
          />
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
