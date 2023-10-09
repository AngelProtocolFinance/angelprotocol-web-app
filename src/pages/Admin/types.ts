import { EndowmentProposal } from "types/aws";

export type AdminParams = { id: string };

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  EndowmentProposal,
  "OrganizationName" | "RegistrationDate" | "RegistrationStatus" | "Email"
>;
