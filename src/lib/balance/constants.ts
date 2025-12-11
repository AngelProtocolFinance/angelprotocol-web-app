import type { TBalKeys } from "./interfaces";

export const fields_default: { [K in TBalKeys]: "" } = {
  id: "",
  network: "",
  liq: "",
  lock_units: "",
  cash: "",
  contributionsCount: "",
  totalContributions: "",
  totalContributionsViaMarketplace: "",
  totalContributionsViaWidget: "",
  totalBaseFees: "",
  totalFiscalSponsorFees: "",
  totalProcessingFees: "",
  payoutsPending: "",
};
