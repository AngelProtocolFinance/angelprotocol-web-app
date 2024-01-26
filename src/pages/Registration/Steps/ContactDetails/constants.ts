import { ContactRoles, ReferralMethods } from "types/aws";
import { OptionType } from "types/components";

export const roles: { [key in ContactRoles]: string } = {
  "": "",
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
export const referralMethods: { [key in ReferralMethods]: string } = {
  "": "",
  "better-giving-alliance": "Better Giving Alliance",
  discord: "Discord",
  facebook: "Facebook",
  linkedin: "Linkedin",
  medium: "Medium",
  press: "Press",
  "search-engines": "Search engines",
  twitter: "Twitter",
  referral: "Referral Code",
  other: "Other",
};

function genOptions<T extends object>(
  objOptions: T,
): T extends { [key in infer R]: any } ? OptionType<R>[] : OptionType<never>[] {
  return Object.entries(objOptions).map(([value, label]) => ({
    value,
    label,
  })) as any;
}

export const roleOptions = genOptions(roles);
export const referralOptions = genOptions(referralMethods);
