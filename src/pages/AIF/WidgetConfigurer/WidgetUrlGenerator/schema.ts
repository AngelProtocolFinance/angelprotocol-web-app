import { UrlParamValues } from "pages/DonateWidget";
import { OptionType } from "components/Selector";

export type FormValues = Required<Omit<UrlParamValues, "availCurrs">> & {
  availCurrOpts: OptionType<string>[];
};
