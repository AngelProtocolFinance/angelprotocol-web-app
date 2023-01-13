import { OptionType } from "components/Selector";

export type FilterFormValues = {
  startDate: string;
  endDate: string;
  network: OptionType<string>;
  currency: OptionType<string>;
};
