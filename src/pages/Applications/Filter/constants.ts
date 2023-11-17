import { RegistrationStatus } from "types/aws";
import { OptionType } from "types/components";

export const statuses: OptionType<RegistrationStatus>[] = [
  { label: "Rejected", value: "Rejected" },
  { label: "Under Review", value: "Under Review" },
];
