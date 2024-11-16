import type { Endow, EndowDesignation } from "@better-giving/endowment";
import { getEndow } from "api/get/endow";
import { country } from "components/CountrySelector";
import { parseContent } from "components/RichText";
import { unsdgs } from "constants/unsdgs";
import { type LoaderFunction, useLoaderData } from "react-router-dom";
import Form from "./Form";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import type { FV } from "./schema";

export const loader: LoaderFunction = async ({ params }) => getEndow(params.id);
export { action } from "../endow-update-action";

export function Component() {
  const endow = useLoaderData() as Endow;
  const defaults: FV = {
    name: endow.name,
    published: !!endow.published,
    registration_number: endow.registration_number ?? "",
    social_media_urls: {
      facebook: endow.social_media_urls.facebook,
      instagram: endow.social_media_urls.instagram,
      linkedin: endow.social_media_urls.linkedin,
      twitter: endow.social_media_urls.twitter,
      discord: endow.social_media_urls.discord,
      youtube: endow.social_media_urls.youtube,
      tiktok: endow.social_media_urls.tiktok,
    },
    slug: endow.slug ?? "",
    street_address: endow.street_address ?? "",
    tagline: endow.tagline ?? "",
    url: endow.url ?? "",
    image: {
      name: "",
      publicUrl: endow.image ?? "",
      preview: endow.image ?? "",
    },
    logo: { name: "", publicUrl: endow.logo ?? "", preview: endow.logo ?? "" },
    card_img: {
      name: "",
      publicUrl: endow.card_img ?? "",
      preview: endow.card_img ?? "",
    },
    endow_designation: endow.endow_designation
      ? { label: endow.endow_designation, value: endow.endow_designation }
      : { label: "", value: "" as EndowDesignation },
    hq_country: country(endow.hq_country),
    sdgs: endow.sdgs.map((x) => getSDGLabelValuePair(x, unsdgs[x].title)),
    active_in_countries: endow.active_in_countries.map((x) => ({
      label: x,
      value: x,
    })),
    overview: parseContent(endow.overview),
  };

  return <Form initSlug={endow.slug} init={defaults} id={endow.id} />;
}
