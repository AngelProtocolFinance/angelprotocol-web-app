import { Documentation } from "pages/Registration/types";
import { CountryOption } from "services/types";
import { OptionType } from "components/Selector";

type Key = keyof Documentation;
const _level: Key = "level";
const _hqCountry: Key = "hqCountry";
const _activeCountries: Key = "activeInCountries";

export type FormValues = Omit<
  Documentation,
  typeof _level | typeof _hqCountry | typeof _activeCountries
> & {
  [_level]: never;
  [_hqCountry]: CountryOption;
  activeInCountriesOpts: OptionType<string>[];
};
