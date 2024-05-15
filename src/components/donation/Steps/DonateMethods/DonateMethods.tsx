import { Tab } from "@headlessui/react";
import Icon from "components/Icon/Icon";
import { Label } from "components/form";
import type { DonationDetails, FormStep } from "slices/donation";
import type { Config } from "../types";
import Crypto from "./Crypto";
import Daf from "./Daf";
import Stocks from "./Stocks";
import Stripe from "./Stripe";

type Props = {
  donaterConfig: Config | null;
  state: FormStep;
};

const tabIdx = (method?: DonationDetails["method"]) => {
  switch (method) {
    case "stripe":
      return 0;
    case "stocks":
      return 1;
    case "daf":
      return 2;
    case "crypto":
      return 3;
    //other methods doesn't have donate methods yet
    default:
      return 0;
  }
};

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "font-medium bg-blue-l4 text-navy-d4"
      : "border border-gray-l4 @md/steps:border-none text-navy-l1"
  }  flex items-center gap-2 p-2 @md/steps:px-3 @md/steps:py-[1.15rem] @md/steps:grid @md/steps:grid-cols-subgrid @md/steps:col-span-2 focus:outline-none @md/steps:w-28 rounded @md/steps:rounded-none`;

export default function DonateMethods({ donaterConfig, state }: Props) {
  return (
    <Tab.Group
      manual
      as="div"
      className="grid @md/steps:grid-cols-[auto_1fr]"
      defaultIndex={tabIdx(state.details?.method)}
    >
      <Label className="p-4 pb-0 col-span-full @md/steps:hidden font-bold">
        Payment method
      </Label>
      <Tab.List className="grid grid-cols-2 gap-2 @md/steps:gap-0 p-4 @md/steps:p-0 @md/steps:grid-cols-[auto_1fr] @[42rem]/steps:min-w-48 content-start @md/steps:divide-y @md/steps:divide-white @md/steps:border-r border-gray-l4">
        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="CreditCard" className="shrink-0" size={16} />
          <span className="text-left">Card</span>
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="Stocks" className="shrink-0" size={18} />
          <span className="text-left">Stocks</span>
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="Advisor" className="shrink-0" size={19} />
          <span className="text-left">DAF</span>
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>
          <Icon type="Bitcoin" className="shrink-0" size={17} />
          <span className="text-left">Crypto</span>
        </Tab>
      </Tab.List>
      <Tab.Panels
        as="div"
        className="grid p-4 @md/steps:p-8 pt-0 @md/steps:pt-4 "
      >
        <Tab.Panel>
          <Stripe
            recipient={state.recipient}
            step={state.step}
            details={
              state.details?.method === "stripe" ? state.details : undefined
            }
            widgetConfig={donaterConfig}
          />
        </Tab.Panel>
        <Tab.Panel>
          <Stocks
            recipient={state.recipient}
            step={state.step}
            details={
              state.details?.method === "stocks" ? state.details : undefined
            }
          />
        </Tab.Panel>
        <Tab.Panel>
          <Daf
            recipient={state.recipient}
            step={state.step}
            details={
              state.details?.method === "daf" ? state.details : undefined
            }
            widgetConfig={donaterConfig}
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
      </Tab.Panels>
    </Tab.Group>
  );
}
