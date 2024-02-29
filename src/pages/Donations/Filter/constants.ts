import { DonationsQueryParams } from "types/aws";
import { OptionType } from "types/components";

export const statuses: OptionType<Required<DonationsQueryParams>["status"]>[] =
  [
    { label: "RECEIVED", value: "FINALIZED" },
    { label: "PENDING", value: "ON-HOLD" },
  ];
