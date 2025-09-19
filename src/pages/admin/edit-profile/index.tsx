import { imgEditorStyles } from "components/img-editor";
import { richTextStyles, toContent } from "components/rich-text";
import { sans_https } from "helpers/https";
import type { LinksFunction } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { Form } from "./form";
import type { FV } from "./schema";

export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];

export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);
function Page({ loaderData: endow }: Route.ComponentProps) {
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

  return (
    <Form
      init_slug={endow.slug}
      init={defaults}
      id={endow.id}
      base_url={endow.base_url}
    />
  );
}
