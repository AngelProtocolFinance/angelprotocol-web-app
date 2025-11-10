import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Outlet } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { DonationTab } from "./donation";
import { DonationFormTab } from "./donation-form";
import { FundraiserTab } from "./fundraiser";

export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: endow }: Route.ComponentProps) {
  const tabs = [
    { id: "donation", name: "Donation" },
    { id: "fundraiser", name: "Fundraiser" },
    { id: "donation-form", name: "Donation Form" },
  ];

  return (
    <div className="w-full max-w-4xl">
      <TabGroup>
        <TabList className="flex gap-2 border-b border-gray-l3">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `px-4 border-b-2 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  selected
                    ? "border-b-2 border-blue text-blue"
                    : "border-transparent text-gray hover:text-gray-d2"
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="px-6 py-4 md:px-10 md:py-8">
          <TabPanel>
            <DonationTab
              receiptMsg={endow.receiptMsg ?? ""}
              donor_address_required={endow.donor_address_required ?? false}
              hide_bg_tip={endow.hide_bg_tip ?? false}
            />
          </TabPanel>
          <TabPanel>
            <FundraiserTab fundOptIn={endow.fund_opt_in ?? true} />
          </TabPanel>

          <TabPanel>
            <DonationFormTab
              donate_methods={endow.donateMethods ?? ["stripe"]}
              increments={endow.increments ?? []}
              target={endow.target}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <Outlet />
    </div>
  );
}
