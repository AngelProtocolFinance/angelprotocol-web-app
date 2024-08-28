import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import dafPayLogo from "assets/icons/dafpay.svg";
import Icon from "components/Icon/Icon";
import Image from "components/Image";
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
    name: "Card/Bank",
    icon: <Icon type="CreditCard" className="shrink-0" size={18} />,
    panel: Stripe,
  },
  stocks: {
    name: "Stocks",
    icon: <Icon type="Stocks" className="shrink-0" size={18} />,
    panel: Stocks,
  },
  daf: {
    name: "Donor Advised Fund",
    icon: <Image src={dafPayLogo} className="shrink-0 h-4" />,
    panel: Daf,
  },
  crypto: {
    name: "Crypto",
    icon: <Icon type="Bitcoin" className="shrink-0" size={17} />,
    panel: Crypto,
  },
};
const allMethodIds: DonateMethodId[] = ["stripe", "daf", "stocks", "crypto"];

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "font-medium bg-[--accent-secondary] text-navy-d4"
      : "border border-gray-l4 @xl/steps:border-none text-navy-l1"
  }  flex items-center gap-2 p-2 @xl/steps:px-3 @xl/steps:py-[1.15rem] @xl/steps:grid @xl/steps:grid-cols-subgrid @xl/steps:col-span-2 focus:outline-none @xl/steps:w-28 rounded @xl/steps:rounded-none`;

export default function DonateMethods(props: FormStep) {
  const { details, step, init } = props;
  const methodIds = init.config?.methodIds;

  const tabs =
    methodIds?.concat(
      methodIds.includes("daf") && !methodIds.includes("stripe")
        ? ["stripe"]
        : []
    ) || allMethodIds;

  const tabIdxFound = tabs.findIndex((t) => t === details?.method);

  return (
    <TabGroup
      data-testid="donate-methods"
      manual
      as="div"
      className="grid @xl/steps:grid-cols-[auto_1fr]"
      defaultIndex={tabIdxFound === -1 ? 0 : tabIdxFound}
    >
      <Label className="p-4 pb-0 col-span-full @xl/steps:hidden font-bold">
        Payment method
      </Label>
      <TabList className="grid @md/steps:grid-cols-2 gap-2 @xl/steps:gap-0 p-4 @xl/steps:p-0 @xl/steps:grid-cols-[auto_1fr] @[42rem]/steps:min-w-48 content-start @xl/steps:divide-y @xl/steps:divide-white @xl/steps:border-r border-gray-l4">
        {tabs.map((tab) => (
          <Tab key={tab} className={({ selected }) => tabClasses(selected)}>
            {methods[tab].icon}
            <span className="text-left">{methods[tab].name}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels
        as="div"
        className="grid p-4 @xl/steps:p-8 pt-0 @xl/steps:pt-4 "
      >
        {tabs.map((tab) => {
          const Panel = methods[tab].panel;
          return (
            <TabPanel key={tab}>
              <Panel
                init={init}
                step={step}
                details={details?.method === tab ? details : undefined}
              />
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
}
