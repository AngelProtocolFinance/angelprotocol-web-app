import type { RegistrationStatus } from "types/aws";
import type { Country, OptionType } from "types/components";

export type FormValues = {
  startDate: string;
  endDate: string;
  status: OptionType<RegistrationStatus>;
  hqCountry: Country;
  //meta
  donorAddress: string;
};
