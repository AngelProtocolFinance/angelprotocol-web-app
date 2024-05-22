import { Tab } from "@headlessui/react";
import Icon from "components/Icon/Icon";
import { Label } from "components/form";
import type { ReactNode } from "react";
import type { DonateMethodId } from "types/lists";
import type { FormStep } from "../types";
import Crypto from "./Crypto";
import Daf from "./Daf";
import Stocks from "./Stocks";
import Stripe from "./Stripe";

const methods: {
  [K in DonateMethodId]: {
    name: string;
    icon: ReactNode;
    panel: (props: FormStep<any>) => JSX.Element;
  };
} = {
  stripe: {
    name: "Card",
    icon: <Icon type="CreditCard" className="shrink-0" size={16} />,
    panel: Stripe,
  },
  stocks: {
    name: "Stocks",
    icon: <Icon type="Stocks" className="shrink-0" size={18} />,
    panel: Stocks,
  },
  daf: {
    name: "DAF",
    icon: <Icon type="Advisor" className="shrink-0" size={19} />,
    panel: Daf,
  },
  crypto: {
    name: "Crypto",
    icon: <Icon type="Bitcoin" className="shrink-0" size={17} />,
    panel: Crypto,
  },
};
const allMethodIds: DonateMethodId[] = ["stripe", "stocks", "daf", "crypto"];

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "font-medium bg-blue-l4 text-navy-d4"
      : "border border-gray-l4 @md/steps:border-none text-navy-l1"
  }  flex items-center gap-2 p-2 @md/steps:px-3 @md/steps:py-[1.15rem] @md/steps:grid @md/steps:grid-cols-subgrid @md/steps:col-span-2 focus:outline-none @md/steps:w-28 rounded @md/steps:rounded-none`;

export default function DonateMethods(props: FormStep) {
  const { details, step, init } = props;

  const tabs = init.config?.methodIds || allMethodIds;
  const tabIdxFound = tabs.findIndex((t) => t === details?.method);

  return (
    <Tab.Group
      manual
      as="div"
      className="grid @md/steps:grid-cols-[auto_1fr]"
      defaultIndex={tabIdxFound === -1 ? 0 : tabIdxFound}
    >
      <Label className="p-4 pb-0 col-span-full @md/steps:hidden font-bold">
        Payment method
      </Label>
      <Tab.List className="grid grid-cols-2 gap-2 @md/steps:gap-0 p-4 @md/steps:p-0 @md/steps:grid-cols-[auto_1fr] @[42rem]/steps:min-w-48 content-start @md/steps:divide-y @md/steps:divide-white @md/steps:border-r border-gray-l4">
        {tabs.map((tab) => (
          <Tab className={({ selected }) => tabClasses(selected)}>
            {methods[tab].icon}
            <span className="text-left">{methods[tab].name}</span>
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels
        as="div"
        className="grid p-4 @md/steps:p-8 pt-0 @md/steps:pt-4 "
      >
        {tabs.map((tab) => {
          const Panel = methods[tab].panel;
          return (
            <Tab.Panel>
              <Panel init={init} step={step} details={details} />
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}
