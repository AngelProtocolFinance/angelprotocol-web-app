import type { Except } from "type-fest";
import type { EndowmentProfile, EndowmentProfileUpdate } from "types/aws";
import type { FV } from "./types";

type RequiredFields = Pick<EndowmentProfileUpdate, "id">;
type Arg =
  | {
      type: "initial";
      data: EndowmentProfile & RequiredFields;
    }
  | {
      type: "final";
      data: Except<FV, "id" | "initial"> & RequiredFields;
      urls: { image: string; logo: string; card_img: string };
    };

export function toProfileUpdate(arg: Arg): EndowmentProfileUpdate {
  if (arg.type === "initial") {
    const { data: d } = arg;
    return {
      id: d.id,
      active_in_countries: d.active_in_countries,
      card_img: d.card_img ?? "",
      endow_designation: d.endow_designation,
      hq_country: d.hq_country,
      image: d.image ?? "",
      kyc_donors_only: d.kyc_donors_only,
      logo: d.logo ?? "",
      name: d.name,
      overview: d.overview ?? "",
      published: !!d.published,
      registration_number: d.registration_number,
      sdgs: d.sdgs,
      social_media_urls: {
        facebook: d.social_media_urls.facebook,
        instagram: d.social_media_urls.instagram,
        linkedin: d.social_media_urls.linkedin,
        twitter: d.social_media_urls.twitter,
        discord: d.social_media_urls.discord,
        youtube: d.social_media_urls.youtube,
        tiktok: d.social_media_urls.tiktok,
      },
      street_address: d.street_address ?? "",
      tagline: d.tagline ?? "",
      url: d.url ?? "",
      slug: d.slug ?? "",
      sfCompounded: !!d.sfCompounded,
    };
  }

  const { data: fv, urls } = arg;
  return {
    ...fv,
    card_img: urls.card_img,
    image: urls.image,
    logo: urls.logo,
    hq_country: fv.hq_country.name,
    endow_designation: fv.endow_designation.value,
    sdgs: fv.sdgs.map((opt) => opt.value),
    active_in_countries: fv.active_in_countries.map((opt) => opt.value),
    overview: fv.overview.value,
  };
}
