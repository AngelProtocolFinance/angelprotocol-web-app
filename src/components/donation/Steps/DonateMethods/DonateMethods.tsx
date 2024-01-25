import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { DonationDetails, FormStep } from "slices/donation";
import Crypto from "./Crypto";
import DAFDirect from "./DAFDirect";
import PayPal from "./PayPal";
import Stocks from "./Stocks";
import Stripe from "./Stripe";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};

const tabIdx = (method?: DonationDetails["method"]) => {
  switch (method) {
    case "crypto":
      return 1;
    case "paypal":
      return 4;
    case "stripe":
      return 0;
    default:
      return 0;
  }
};

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "font-semibold bg-blue @md:bg-white text-white @md:text-black"
      : "border border-prim @md:border-none"
  } text-sm text-left p-2 @md:p-4 focus:outline-none @md:w-28 rounded @md:rounded-none`;

export default function DonateMethods({ donaterConfig, state }: Props) {
  return (
    <Tab.Group
      manual
      as="div"
      className="grid @md:grid-cols-[auto_1fr]"
      defaultIndex={tabIdx(state.details?.method)}
    >
      <Tab.List className="grid grid-cols-2 gap-2 @md:gap-0 p-4 @md:p-0 @md:grid-cols-1 content-start @md:bg-blue-l4 @md:divide-y @md:divide-white">
        <Tab className={({ selected }) => tabClasses(selected)}>Card</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Stocks</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>DAF</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>PayPal</Tab>
      </Tab.List>
      <Tab.Panels as="div" className="p-4 @md:p-8 pt-0 @md:pt-4 ">
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
        <Tab.Panel>
          <PayPal
            recipient={state.recipient}
            step={state.step}
            details={
              state.details?.method === "paypal" ? state.details : undefined
            }
            widgetConfig={donaterConfig}
            advanceOptDisplay={
              donaterConfig?.advancedOptionsDisplay ?? "collapsed"
            }
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
