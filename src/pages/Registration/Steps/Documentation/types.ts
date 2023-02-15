import { Documentation } from "pages/Registration/types";
import { OptionType } from "components/Selector";

export type FormValues = Omit<Documentation, "level" | "activeInCountries"> & {
  activeInCountriesOpts: OptionType<string>[];
};
