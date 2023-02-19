import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FlatFormValues, FormValues } from "./types";
import { EndowmentProfile } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useProfileQuery } from "services/aws/aws";
import Seo from "components/Seo";
import { FormError, FormSkeleton } from "components/admin";
import { APP_NAME, DAPP_DOMAIN } from "constants/common";
import { unsdgs } from "constants/unsdgs";
import Form from "./Form";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { schema } from "./schema";

export default function EditProfile() {
  const { id } = useAdminResources();
  const { data: profile, isLoading, isFetching, isError } = useProfileQuery(id);

  if (isLoading || isFetching)
    return <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />;
  if (isError || !profile)
    return <FormError errorMessage="Failed to load profile" />;

  return <FormWithContext {...profile} />;
}

function FormWithContext(props: EndowmentProfile) {
  // could just add to useForm.defaultValue - but not Partial here
  const flatInitial: FlatFormValues = {
    name: props.name,
    categories_sdgs: props.categories.sdgs,
    hq_country: props.hq.country || "",
    active_in_countries: props.active_in_countries,
    image: props.image || "",
    logo: props.logo || "",
    kyc_donors_only: props.kyc_donors_only,
    overview: props.overview,
    url: props.url || "",
    registration_number: props.registration_number || "",
    social_media_url_facebook: props.social_media_urls.facebook || "",
    social_media_url_linkedin: props.social_media_urls.linkedin || "",
    social_media_url_twitter: props.social_media_urls.twitter || "",
    social_media_url_discord: props.social_media_urls.discord || "",
    social_media_url_instagram: props.social_media_urls.instagram || "",
    social_media_url_youtube: props.social_media_urls.youtube || "",
    social_media_url_tiktok: props.social_media_urls.tiktok || "",
    street_address: props.street_address || "",
    tagline: props.tagline,
  };

  const defaults: FormValues = {
    ...flatInitial,
    image: { name: "", publicUrl: props.image, preview: props.image },
    logo: { name: "", publicUrl: props.logo, preview: props.logo },
    hq_country: { flag: "", name: props.hq.country || "" },
    categories_sdgs: props.categories.sdgs.map((x) =>
      getSDGLabelValuePair(x, unsdgs[x].title)
    ),
    active_in_countries: props.active_in_countries.map((x) => ({
      label: x,
      value: x,
    })),
    initial: flatInitial,
  };

  const methods = useForm<FormValues>({
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Seo
        title={`${props.name} profile update - ${APP_NAME}`}
        description={`${props.overview.slice(0, 140)}`}
        name={`${props.name}`}
        image={`${props.logo}`}
        url={`${DAPP_DOMAIN}/profile/${props.id}`}
      />
      <Form />
    </FormProvider>
  );
}
