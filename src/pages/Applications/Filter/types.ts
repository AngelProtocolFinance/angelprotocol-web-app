import { RegistrationStatus } from "types/aws";
import { OptionType } from "types/components";

export type FormValues = {
  startDate: string;
  endDate: string;
  network: OptionType<string>;
  currency: OptionType<string>;
  status: OptionType<RegistrationStatus>;

  //meta
  donorAddress: string;
};
