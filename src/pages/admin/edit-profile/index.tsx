import type { LinksFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { imgEditorStyles } from "components/img-editor";
import { richTextStyles, toContent } from "components/rich-text";
import type { LoaderData } from "./api";
import Form from "./form";
import type { FV } from "./schema";

export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];

const sans_https = (x: string | undefined) => x && x.replace(/^https:\/\//, "");

export { ErrorBoundary } from "components/error";
export default function EditProfile() {
  const endow = useCachedLoaderData<LoaderData>();
  const defaults: FV = {
    name: endow.name,
    published: !!endow.published,
    registration_number: endow.registration_number ?? "",
    social_media_urls: {
      facebook: sans_https(endow.social_media_urls.facebook),
      instagram: sans_https(endow.social_media_urls.instagram),
      linkedin: sans_https(endow.social_media_urls.linkedin),
      twitter: sans_https(endow.social_media_urls.twitter),
      discord: sans_https(endow.social_media_urls.discord),
      youtube: sans_https(endow.social_media_urls.youtube),
      tiktok: sans_https(endow.social_media_urls.tiktok),
    },
    slug: endow.slug ?? "",
    street_address: endow.street_address ?? "",
    tagline: endow.tagline ?? "",
    url: sans_https(endow.url) ?? "",
    image: endow.image ?? "",
    logo: endow.logo ?? "",
    card_img: endow.card_img ?? "",
    endow_designation: endow.endow_designation,
    hq_country: endow.hq_country,
    sdgs: endow.sdgs.map((x) => x.toString()),
    active_in_countries: endow.active_in_countries,
    overview: toContent(endow.overview),
  };

  return <Form initSlug={endow.slug} init={defaults} id={endow.id} />;
}
