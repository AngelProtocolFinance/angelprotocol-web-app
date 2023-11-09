import { Except, OverrideProperties } from "type-fest";
import { EndowDesignation, OrgDetails } from "types/aws";
import { Country } from "types/countries";
import { UNSDG_NUMS } from "types/lists";
import { OptionType } from "types/utils";

export type FormValues = OverrideProperties<
  Except<OrgDetails, "KycDonorsOnly">,
  {
    HqCountry: Country;
    EndowDesignation: OptionType<EndowDesignation | "">;
    ActiveInCountries: OptionType<string>[];
    UN_SDG: OptionType<UNSDG_NUMS>[];
  }
> & { isAnonymousDonationsAllowed: "Yes" | "No" };
