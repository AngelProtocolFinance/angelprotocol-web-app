import type { ImgLink } from "components/ImgEditor";
import type { OverrideProperties } from "type-fest";
import type { EndowDesignation, EndowmentProfileUpdate } from "types/aws";
import type { OptionType, RichTextContent } from "types/components";
import type { Country } from "types/components";
import type { UNSDG_NUMS } from "types/lists";

export type FV = OverrideProperties<
  EndowmentProfileUpdate,
  {
    endow_designation: OptionType<EndowDesignation | "">;
    logo: ImgLink;
    image: ImgLink;
    card_img: ImgLink;
    hq_country: Country;
    sdgs: OptionType<UNSDG_NUMS>[];
    active_in_countries: OptionType<string>[];
    overview: RichTextContent;
  }
> & { initial: EndowmentProfileUpdate };
