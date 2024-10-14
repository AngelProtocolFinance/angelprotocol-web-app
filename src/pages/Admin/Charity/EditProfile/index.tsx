import { country } from "components/CountrySelector";
import { parseContent } from "components/RichText";
import Seo from "components/Seo";
import { adminRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { type LoaderFunction, useLoaderData } from "react-router-dom";
import { apiEnv } from "services/constants";
import type { EndowmentProfile as TProfile } from "types/aws";
import Form from "./Form";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import type { FV } from "./schema";

export const loader: LoaderFunction = async ({ params }) => {
  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);
  url.pathname = `v9/endowments/${params.id}`;
  return cacheGet(url);
};

export function Component() {
  const profile = useLoaderData() as TProfile;
  return (
    <>
      <Seo
        title="Edit Profile"
        url={`${adminRoutes.edit_profile}/${profile.id}`}
      />
      <FormWithContext {...profile} />
    </>
  );
}

function FormWithContext(props: TProfile & { id: number }) {
  const defaults: FV = {
    name: props.name,
    published: !!props.published,
    registration_number: props.registration_number ?? "",
    social_media_urls: {
      facebook: props.social_media_urls.facebook,
      instagram: props.social_media_urls.instagram,
      linkedin: props.social_media_urls.linkedin,
      twitter: props.social_media_urls.twitter,
      discord: props.social_media_urls.discord,
      youtube: props.social_media_urls.youtube,
      tiktok: props.social_media_urls.tiktok,
    },
    slug: props.slug ?? "",
    street_address: props.street_address ?? "",
    tagline: props.tagline ?? "",
    url: props.url ?? "",
    image: {
      name: "",
      publicUrl: props.image ?? "",
      preview: props.image ?? "",
    },
    logo: { name: "", publicUrl: props.logo ?? "", preview: props.logo ?? "" },
    card_img: {
      name: "",
      publicUrl: props.card_img ?? "",
      preview: props.card_img ?? "",
    },
    endow_designation: props.endow_designation
      ? { label: props.endow_designation, value: props.endow_designation }
      : { label: "", value: "" },
    hq_country: country(props.hq_country),
    sdgs: props.sdgs.map((x) => getSDGLabelValuePair(x, unsdgs[x].title)),
    active_in_countries: props.active_in_countries.map((x) => ({
      label: x,
      value: x,
    })),
    overview: parseContent(props.overview),
  };

  return <Form initSlug={props.slug} init={defaults} id={props.id} />;
}
