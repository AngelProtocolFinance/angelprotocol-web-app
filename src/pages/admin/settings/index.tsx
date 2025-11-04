import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ArrowUpRightIcon } from "lucide-react";
import { NavLink, Outlet, href } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { DonationTab } from "./donation";
import { FundraiserTab } from "./fundraiser";

export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: endow }: Route.ComponentProps) {
  const tabs = [
    { id: "donation", name: "Donation" },
    { id: "fundraiser", name: "Fundraiser" },
  ];

  return (
    <div className="w-full max-w-4xl">
      <TabGroup>
        <TabList className="flex border-b border-gray-l3">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `p-2 border-b-2 text-sm font-medium transition-colors focus:outline-none ${
                  selected
                    ? "border-b-2 border-blue text-blue"
                    : "border-transparent text-gray hover:text-gray-d2"
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
          <Tab
            className="flex items-center border-transparent text-gray hover:text-gray-d2 p-2 border-b-2 text-sm font-medium transition-colors focus:outline-none"
            as={NavLink}
            to={href("/forms/:id/edit", { id: endow.id.toString() })}
          >
            <span>Donation form</span>
            <ArrowUpRightIcon size={13} />
          </Tab>
        </TabList>

        <TabPanels className="px-6 py-4 md:px-10 md:py-8">
          <TabPanel>
            <DonationTab
              receiptMsg={endow.receiptMsg ?? ""}
              hide_bg_tip={endow.hide_bg_tip ?? false}
            />
          </TabPanel>
          <TabPanel>
            <FundraiserTab fundOptIn={endow.fund_opt_in ?? true} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <Outlet />
    </div>
  );
}
