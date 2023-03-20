import { Endowment } from "types/aws";
import { OptionType } from "components/Selector";

export type FormValues = {
  endowIdName: Pick<Endowment, "id" | "name">;
  hideText: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
