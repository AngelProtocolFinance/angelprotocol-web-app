import type { RegistrationStatus } from "types/aws";
import type { OptionType } from "types/components";

export const statuses: OptionType<RegistrationStatus>[] = [
  { label: "Rejected", value: "Rejected" },
  { label: "Under Review", value: "Under Review" },
  { label: "Approved", value: "Active" },
];
