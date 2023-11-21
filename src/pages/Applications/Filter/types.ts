import { RegistrationStatus } from "types/aws";
import { Country, OptionType } from "types/components";

export type FormValues = {
  startDate: string;
  endDate: string;
  status: OptionType<RegistrationStatus>;
  hqCountry: Country;
  //meta
  donorAddress: string;
};
