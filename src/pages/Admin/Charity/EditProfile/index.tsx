import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { EndowmentProfile } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useProfileQuery } from "services/aws/aws";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function EditProfile() {
  const { endowmentId } = useAdminResources();
  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
  } = useProfileQuery(endowmentId);

  if (isLoading || isFetching)
    return <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />;
  if (isError || !profile)
    return <FormError errorMessage="Failed to load profile" />;

  return <FormWithContext {...profile} />;
}

function FormWithContext(props: EndowmentProfile) {
  // could just add to useForm.defaultValue - but not Partial here
  const initial: FormValues = {
    name: props.name,
    tagline: props.tagline || "",
    active_in_countries: props.active_in_countries,
    categories_general: props.categories.general.map((g) => `${g}`),
    categories_sdgs: props.categories.sdgs,
    contact_email: props.contact_email,
    hq_city: props.hq.city || "",
    hq_country: { flag: "", name: props.hq.country || "" },
    image: { name: "", publicUrl: props.image, preview: props.image },
    logo: { name: "", publicUrl: props.logo, preview: props.logo },
    kyc_donors_only: props.kyc_donors_only,
    overview: props.overview,
    url: props.url || "",
    registration_number: props.registration_number || "",
    social_media_url_facebook: props.social_media_urls.facebook || "",
    social_media_url_linkedin: props.social_media_urls.linkedin || "",
    social_media_url_twitter: props.social_media_urls.linkedin || "",
    street_address: props.street_address || "",
  };

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initial,
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
