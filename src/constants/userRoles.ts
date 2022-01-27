import { OptionType } from "../types/optionType";

export enum UserRoleValues {
  PRESIDENT = "president",
  VICE_PRESIDENT = "vice-president",
  SECRETARY = "secretary",
  TREASURER = "treasurer",
  CEO = "ceo",
  CFO = "cfo",
  OTHER = "other",
}

export const userRoles: OptionType[] = [
  { label: "Chairperson / President", value: UserRoleValues.PRESIDENT },
  {
    label: "Vice-chairperson / Vice president",
    value: UserRoleValues.VICE_PRESIDENT,
  },
  { label: "Secretary", value: UserRoleValues.SECRETARY },
  { label: "Treasurer", value: UserRoleValues.TREASURER },
  { label: "CEO", value: UserRoleValues.CEO },
  { label: "CFO", value: UserRoleValues.CFO },
  { label: "Other", value: UserRoleValues.OTHER },
];
