import type { Status } from "@better-giving/registration/models";
import type { Country, OptionType } from "types/components";

export type FormValues = {
  startDate: string;
  endDate: string;
  status: OptionType<Exclude<Status, "01">>;
  hqCountry: Country;
  //meta
  donorAddress: string;
};
