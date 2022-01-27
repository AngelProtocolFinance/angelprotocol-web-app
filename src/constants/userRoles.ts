import { OptionType } from "../types/optionType";

export enum UserRoles {
  president = "president",
  vice_president = "vice-president",
  secretary = "secretary",
  treasurer = "treasurer",
  ceo = "ceo",
  cfo = "cfo",
  other = "other",
}

export const userRoleOptions: OptionType[] = [
  { label: "Chairperson / President", value: UserRoles.president },
  {
    label: "Vice-chairperson / Vice president",
    value: UserRoles.vice_president,
  },
  { label: "Secretary", value: UserRoles.secretary },
  { label: "Treasurer", value: UserRoles.treasurer },
  { label: "CEO", value: UserRoles.ceo },
  { label: "CFO", value: UserRoles.cfo },
  { label: "Other", value: UserRoles.other },
];
