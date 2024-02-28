import { Except } from "type-fest";
import { FV } from "./types";
import { EndowmentProfile, EndowmentProfileUpdate } from "types/aws";

type RequiredFields = Pick<EndowmentProfileUpdate, "id">;
type Arg =
  | {
      type: "initial";
      data: EndowmentProfile & RequiredFields;
    }
  | {
      type: "final";
      data: Except<FV, "id" | "initial"> & RequiredFields;
      urls: { image: string; logo: string };
    };

export function toProfileUpdate(arg: Arg): EndowmentProfileUpdate {
  if (arg.type === "initial") {
    const { data: d } = arg;
    return {
      id: d.id,
      active_in_countries: d.active_in_countries,
      contact_email: d.contact_email,
      endow_designation: d.endow_designation,
      hq_country: d.hq_country,
      image: d.image,
      kyc_donors_only: d.kyc_donors_only,
      logo: d.logo,
      name: d.name,
      overview: d.overview,
      program: [], //program is updated in /create-program
      program_id: "",
      published: d.published,
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
      street_address: d.street_address,
      tagline: d.tagline ?? "",
      url: d.url ?? "",
    };
  }

  const { data: fv, urls } = arg;
  return {
    ...fv,
    program: [], //program is updated in /create-program
    image: urls.image,
    logo: urls.logo,
    hq_country: fv.hq_country.name,
    endow_designation: fv.endow_designation.value,
    sdgs: fv.sdgs.map((opt) => opt.value),
    active_in_countries: fv.active_in_countries.map((opt) => opt.value),
    overview: fv.overview.value,
  };
}
