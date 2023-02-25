import { OptionType } from "@giving/types/components/selector";

export type FormValues = {
  startDate: string;
  endDate: string;
  network: OptionType<string>;
  currency: OptionType<string>;
  status: OptionType<string>;

  //meta
  donorAddress: string;
};
