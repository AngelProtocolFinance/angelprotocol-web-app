import { OverrideProperties } from "type-fest";
import { EndowDesignation, EndowmentProfileUpdate } from "types/aws";
import { Country } from "types/countries";
import { UNSDG_NUMS } from "types/lists";
import { ImgLink } from "components/ImgEditor";
import { OptionType } from "components/Selector";

export type FV = OverrideProperties<
  EndowmentProfileUpdate,
  {
    endow_designation: OptionType<EndowDesignation | "">;
    logo: ImgLink;
    image: ImgLink;
    hq_country: Country;
    sdgs: OptionType<UNSDG_NUMS>[];
    active_in_countries: OptionType<string>[];
  }
> & { initial: EndowmentProfileUpdate };
