import { OptionType } from "components/Selector";

export type FormValues = {
  startDate: string;
  endDate: string;
  network: OptionType<string>;
  currency: OptionType<string>;
  status: OptionType<string>;

  //meta
  donorAddress: string;
};
