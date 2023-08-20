import { RegistrationStatus } from "types/aws";

export const statusColors: { [key in RegistrationStatus]: { text: string } } = {
  Inactive: { text: "text-gray" },
  "Under Review": { text: "text-orange" },
  Active: { text: "text-green-l1" },
  Rejected: { text: "text-red-l1" },
  //this will not be used as application can't be made if `RegistrationStatus:Pending Signature`
  "Pending Signature": { text: "text-orange" },
};
