import { RegistrationStatus } from "types/server/aws";

export const statusColors: { [key in RegistrationStatus]: { text: string } } = {
  Inactive: { text: "text-grey-accent" },
  "Under Review": { text: "text-orange" },
  Approved: { text: "text-bright-green" },
  Active: { text: "text-bright-green" },
};
