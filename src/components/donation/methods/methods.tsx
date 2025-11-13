import type { DonateMethodId } from "@better-giving/endowment";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import dafPayLogo from "assets/icons/dafpay.svg";
import { Label } from "components/form";
import { Image } from "components/image";
import { ChartSpline, Coins, CreditCard } from "lucide-react";
import type { ReactNode } from "react";
import { all_method_ids } from "../common/constants";
import type { TDonation, TMethodState } from "../types";
import { Form as Crypto } from "./crypto";
import { Form as Daf } from "./daf";
import { Form as Stocks } from "./stocks";
import { Form as Stripe } from "./stripe";

const methods: {
  [K in DonateMethodId]: {
    name: string;
    icon: ReactNode;
    panel: (props: TMethodState<K>) => JSX.Element;
  };
} = {
  stripe: {
    name: "Card/Bank",
    icon: <CreditCard className="shrink-0" size={18} />,
    panel: Stripe,
  },
  stocks: {
    name: "Stocks",
    icon: <ChartSpline className="shrink-0" size={18} />,
    panel: Stocks,
  },
  daf: {
    name: "Donor Advised Fund",
    icon: <Image src={dafPayLogo} className="shrink-0 h-4" />,
    panel: Daf,
  },
  crypto: {
    name: "Crypto",
    icon: <Coins className="shrink-0" size={22} />,
    panel: Crypto,
  },
};

const tab_classes = (selected: boolean) =>
  `${
    selected
      ? "bg-(--accent-secondary) text-gray-d4"
      : "outline outline-gray-l3 @xl/steps:outline-none text-gray"
  } flex items-center gap-2 p-2 @xl/steps:px-3 @xl/steps:py-[1.15rem] @xl/steps:grid @xl/steps:grid-cols-subgrid @xl/steps:col-span-2 focus:outline-hidden @xl/steps:w-full rounded @xl/steps:rounded-none`;

export function DonateMethods(props: TDonation) {
  const { config, method, ...fvs } = props;
  const { method_ids: tabs = all_method_ids } = config || {};
  const tab_idx_found = tabs.findIndex((t) => t === method);

  if (tabs.length === 1) {
    const Panel = methods[method].panel;
    const s: TMethodState<typeof method> = fvs[method] || {
      type: method,
      step: "form",
    };
    return (
      <div className="grid p-4 @xl/steps:p-8">
        <Panel {...(s as any)} />
      </div>
    );
  }

  return (
    <TabGroup
      data-testid="donate-methods"
      manual
      as="div"
      className="grid @xl/steps:grid-cols-[auto_1fr]"
      defaultIndex={tab_idx_found === -1 ? 0 : tab_idx_found}
    >
      <Label className="p-4 pb-0 col-span-full @xl/steps:hidden font-bold">
        Payment method
      </Label>
      <TabList className="grid @md/steps:grid-cols-2 gap-2 @xl/steps:gap-0 p-4 @xl/steps:p-0 @xl/steps:grid-cols-[auto_1fr] @[42rem]/steps:min-w-48 content-start @xl/steps:divide-y @xl/steps:divide-white @xl/steps:border-r border-gray-l3">
        {tabs.map((tab) => (
          <Tab key={tab} className={({ selected }) => tab_classes(selected)}>
            {methods[tab].icon}
            <span className="text-left text-sm">{methods[tab].name}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels
        as="div"
        className="grid p-4 @xl/steps:p-8 pt-0 @xl/steps:pt-4"
      >
        {tabs.map((tab) => {
          const Panel = methods[tab].panel;
          const s: TMethodState<typeof tab> = fvs[tab] || {
            type: tab,
            step: "form",
          };
          return (
            <TabPanel key={tab}>
              <Panel {...(s as any)} />
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
}
