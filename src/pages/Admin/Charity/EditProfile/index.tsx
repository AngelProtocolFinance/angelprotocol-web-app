import { country } from "components/CountrySelector";
import { parseContent } from "components/RichText";
import { FormError, FormSkeleton } from "components/admin";
import { adminRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { useEndowment } from "services/aws/useEndowment";
import type { EndowmentProfile as TProfile } from "types/aws";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import type { FV } from "./schema";

export function Component() {
  const { id } = useAdminContext();
  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useEndowment({ id });

  const content =
    isLoading || isFetching ? (
      <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />
    ) : isError || !profile ? (
      <FormError errorMessage="Failed to load profile" />
    ) : (
      <FormWithContext {...profile} />
    );

  return (
    <>
      <Seo title="Edit Profile" url={`${adminRoutes.edit_profile}/${id}`} />
      {content}
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
