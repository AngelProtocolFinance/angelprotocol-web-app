import type { TReferralMethod, TRole } from "@better-giving/reg";

export const roles: { [key in TRole]: string } = {
  "executive-director": "Executive Director",
  president: "Chairperson / President",
  "vice-president": "Vice-chairperson / Vice president",
  secretary: "Secretary",
  treasurer: "Treasurer",
  ceo: "CEO",
  cfo: "CFO",
  "board-member": "Board Member",
  "leadership-team": "Leadership Team",
  "fundraising-finance": "Fundraising / Finance",
  legal: "Legal",
  communications: "Communications",
  other: "Other",
};
export const referral_methods: { [key in TReferralMethod]: string } = {
  "better-giving-alliance": "Better.Giving Website",
  discord: "Discord",
  facebook: "Facebook",
  linkedin: "Linkedin",
  medium: "Medium", //not used in hubspot - coerced to "Other"
  press: "Press",
  "search-engines": "Search engines",
  twitter: "Twitter",
  referral: "Referral Code", //not used in hubspot -  coerced to "Other"
  other: "Other",
};
