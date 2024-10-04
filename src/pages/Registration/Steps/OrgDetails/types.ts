import type { EndowDesignation, Org } from "@better-giving/registration/models";
import type { Except, OverrideProperties } from "type-fest";
import type { Country, OptionType } from "types/components";
import type { UNSDG_NUMS } from "types/lists";

export type FormValues = OverrideProperties<
  Except<Org, "kyc_donors_only">,
  {
    hq_country: Country;
    designation: OptionType<EndowDesignation | "">;
    active_in_countries: OptionType<string>[];
    un_sdg: OptionType<UNSDG_NUMS>[];
  }
> & { isAnonymousDonationsAllowed: "yes" | "no" };
