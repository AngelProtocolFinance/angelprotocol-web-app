import { Tab } from "@headlessui/react";
import Icon from "components/Icon/Icon";
import { DonationDetails, FormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";
import Crypto from "./Crypto";
import DAFDirect from "./DAFDirect";
import PayPal from "./PayPal";
import Stocks from "./Stocks";
import Stripe from "./Stripe";
import { useState } from "react";

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
  } text-sm flex items-center gap-2 p-2 @md:px-3 @md:py-4 focus:outline-none @md:w-28 rounded @md:rounded-none`;

export default function DonateMethods({ donaterConfig, state }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Tab.Group
      manual
      as="div"
      className="grid @md:grid-cols-[auto_1fr]"
      defaultIndex={tabIdx(state.details?.method)}
    >
      <Tab.List className="grid grid-cols-2 gap-2 @md:gap-0 p-4 @md:p-0 @md:grid-cols-1 content-start @md:bg-blue-l4 @md:divide-y @md:divide-white">
        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="CreditCard" size={16} />
          <span>Card</span>
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="Paypal" size={16} />
          <span>Paypal</span>
        </Tab>

        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="Stocks" size={18} />
          <span>Stocks</span>
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="Advisor" size={19} />
          <span>DAF</span>
        </Tab>

        {/** more options */}
        <div className="contents">
          <Tab className={({ selected }) => tabClasses(selected)}>
            <Icon type="Bitcoin" size={18} />
            <span>Crypto</span>
          </Tab>
        </div>
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
        <Tab.Panel>
          <Stocks state={state} />
        </Tab.Panel>
        <Tab.Panel>
          <DAFDirect />
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
      </Tab.Panels>
    </Tab.Group>
  );
}
