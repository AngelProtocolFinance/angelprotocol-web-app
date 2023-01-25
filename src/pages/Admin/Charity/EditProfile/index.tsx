import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FlatFormValues, FormValues } from "./types";
import { EndowmentProfile } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useProfileQuery } from "services/aws/aws";
import { FormError, FormSkeleton } from "components/admin";
import { unsdgs } from "constants/unsdgs";
import Form from "./Form";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { schema } from "./schema";

export default function EditProfile() {
  // const { endowmentId } = useAdminResources();
  // const {
  //   data: profile,
  //   isLoading,
  //   isFetching,
  //   isError,
  // } = useProfileQuery(endowmentId);
  const profile: EndowmentProfile = {
    active_in_countries: ["Temp"],
    categories: { sdgs: [1, 2, 3] },
    contact_email: "sdfa@fads.com",
    hq: { country: "Iceland" },
    id: 11,
    image: "",
    kyc_donors_only: false,
    logo: "",
    name: "Test",
    overall: 1,
    overview: "",
    social_media_urls: {},
    total_liq: 0,
    total_lock: 0,
    registration_number: "1",
    street_address: "some street",
    url: "https://www.example.com",
  };

  const isLoading = false;
  const isFetching = false;
  const isError = false;

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
    contact_email: props.contact_email,
    hq_city: props.hq.city || "",
    hq_country: props.hq.country || "",
    image: props.image || "",
    logo: props.logo || "",
    kyc_donors_only: props.kyc_donors_only,
    overview: props.overview,
    url: props.url || "",
    registration_number: props.registration_number || "",
    social_media_url_facebook: props.social_media_urls.facebook || "",
    social_media_url_linkedin: props.social_media_urls.linkedin || "",
    social_media_url_twitter: props.social_media_urls.linkedin || "",
    street_address: props.street_address || "",
  };

  const defaults: FormValues = {
    ...flatInitial,
    image: { name: "", publicUrl: props.image, preview: props.image },
    logo: { name: "", publicUrl: props.logo, preview: props.logo },
    hq_country: { flag: "", name: props.hq.country || "" },
    categories_sdgs: flatInitial.categories_sdgs.map((x) =>
      getSDGLabelValuePair(x, unsdgs[x].title)
    ),
    initial: flatInitial,
  };

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
