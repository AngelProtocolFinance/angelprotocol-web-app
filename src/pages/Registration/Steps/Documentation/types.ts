import { Documentation } from "pages/Registration/types";
import { CountryOption } from "services/types";
import { OptionType } from "components/Selector";

export type FormValues = Omit<
  Documentation,
  "level" | "hqCountry" | "activeInCountries"
> & {
  hqCountry: CountryOption;
  activeInCountriesOpts: OptionType<string>[];
};
