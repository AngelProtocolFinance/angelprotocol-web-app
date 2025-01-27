import type { Status } from "@better-giving/registration/models";
import type { OptionType } from "types/components";

export const statuses: OptionType<Exclude<Status, "01">>[] = [
  { label: "Rejected", value: "04" },
  { label: "Under Review", value: "02" },
  { label: "Approved", value: "03" },
];
