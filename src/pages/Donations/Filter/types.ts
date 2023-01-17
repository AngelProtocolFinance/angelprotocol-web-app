import { OptionType } from "components/Selector";

export type FormValues = {
  startDate: Date;
  endDate: Date;
  network: OptionType<string>;
  currency: OptionType<string>;

  //meta
  donorAddress: string;
};
