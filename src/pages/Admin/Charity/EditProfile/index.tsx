import type { EndowDesignation } from "@better-giving/endowment";
import type { LinksFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { country } from "components/country-selector";
import { imgEditorStyles } from "components/img-editor";
import { richTextStyles, toContent } from "components/rich-text";
import { unsdgs } from "constants/unsdgs";
import Form from "./Form";
import type { LoaderData } from "./api";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import type { FV } from "./schema";

export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
export { ErrorBoundary } from "components/error";
export default function EditProfile() {
  const endow = useCachedLoaderData<LoaderData>();
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
    image: endow.image ?? "",
    logo: endow.logo ?? "",
    card_img: endow.card_img ?? "",
    endow_designation: endow.endow_designation
      ? { label: endow.endow_designation, value: endow.endow_designation }
      : { label: "", value: "" as EndowDesignation },
    hq_country: country(endow.hq_country),
    sdgs: endow.sdgs.map((x) => getSDGLabelValuePair(x, unsdgs[x].title)),
    active_in_countries: endow.active_in_countries.map((x) => ({
      label: x,
      value: x,
    })),
    overview: toContent(endow.overview),
  };

  return <Form initSlug={endow.slug} init={defaults} id={endow.id} />;
}
