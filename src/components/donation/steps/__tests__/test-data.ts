import type { Endow } from "@better-giving/endowment";
import { Outlet } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import type { DonateData } from "api/donate-loader";
import type { ReactNode } from "react";
import type { UserV2 } from "types/auth";

const endow: Endow = {
  id: 1,
  registration_number: "E001",
  name: "Global Education Fund",
  endow_designation: "Charity",
  hq_country: "United States",
  active_in_countries: ["United States", "India", "Kenya"],
  social_media_urls: {
    twitter: "https://twitter.com/globaledfund",
    facebook: "https://facebook.com/globaledfund",
  },
  sdgs: [1],
  kyc_donors_only: false,
  fiscal_sponsored: true,
  claimed: true,
  env: "staging",
};

export const testDonateData: DonateData = {
  id: 1,
  endow,
  balance: Promise.resolve({} as any),
};

interface Data {
  root?: Partial<UserV2>;
  ldr?: DonateData;
}
export const stb = (node: ReactNode, data?: Data) => {
  const { root = null, ldr = testDonateData } = data || {};
  return createRemixStub([
    {
      path: "/",
      id: "root",
      loader: () => Promise.resolve(root),
      children: [{ Component: () => node, index: true, loader: () => ldr }],
      Component: Outlet,
    },
  ]);
};
