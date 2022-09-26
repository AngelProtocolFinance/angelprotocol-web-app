import { RegistrationStatus } from "types/aws";

export const statusColors: { [key in RegistrationStatus]: { text: string } } = {
  Inactive: { text: "text-grey-accent" },
  "Under Review": { text: "text-orange" },
  Active: { text: "text-bright-green" },
  Rejected: { text: "text-red-400" },
};
