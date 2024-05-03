import type { Except, OverrideProperties } from "type-fest";
import type { EndowDesignation, OrgDetails } from "types/aws";
import type { Country, OptionType } from "types/components";
import type { UNSDG_NUMS } from "types/lists";

export type FormValues = OverrideProperties<
  Except<OrgDetails, "KycDonorsOnly">,
  {
    HqCountry: Country;
    EndowDesignation: OptionType<EndowDesignation | "">;
    ActiveInCountries: OptionType<string>[];
    UN_SDG: OptionType<UNSDG_NUMS>[];
  }
> & { isAnonymousDonationsAllowed: "Yes" | "No" };
