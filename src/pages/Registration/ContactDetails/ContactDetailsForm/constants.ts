import { OptionType, ReferralOptionType } from "pages/Registration/types";

export const contactRoleOptions: OptionType[] = [
  { label: "Chairperson / President", value: "president" },
  {
    label: "Vice-chairperson / Vice president",
    value: "vice-president",
  },
  { label: "Secretary", value: "secretary" },
  { label: "Treasurer", value: "treasurer" },
  { label: "CEO", value: "ceo" },
  { label: "CFO", value: "cfo" },
  { label: "Board Member", value: "board-member" },
  { label: "Leadership Team", value: "leadership-team" },
  { label: "Fundraising / Finance", value: "fundraising-finance" },
  { label: "Legal", value: "legal" },
  { label: "Communications", value: "communications" },
  { label: "Other", value: "other" },
];

export const referralMethodOptions: ReferralOptionType[] = [
  { label: "Angel Alliance", value: "angel-alliance" },
  { label: "Discord", value: "discord" },
  { label: "Facebook", value: "facebook" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Medium", value: "medium" },
  { label: "Press", value: "press" },
  { label: "Search Engines", value: "search-engines" },
  { label: "Twitter", value: "twitter" },
  { label: "Other", value: "other" },
];
