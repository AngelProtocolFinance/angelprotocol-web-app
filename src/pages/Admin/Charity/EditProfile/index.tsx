import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EndowmentProfile, EndowmentProfileUpdate } from "types/aws";
import { ProfileUpdate } from "types/contracts";
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

  return <FormWithContext {...profile} id={endowmentId} />;
}

function FormWithContext(props: EndowmentProfile & { id: number }) {
  //initialize falsy values
  const flatInitial: EndowmentProfileUpdate = {
    id: props.id,
    overview: props.overview,
    url: props.url || "",
    registration_number: props.registration_number || "",
    street_address: props.street_address || "",
    contact_email: props.contact_email || "",
    social_media_url_facebook: props.social_media_urls.facebook || "",
    social_media_url_linkedin: props.social_media_urls.linkedin || "",
    social_media_url_twitter: props.social_media_urls.linkedin || "",

    /*
    
    id: number;
  owner: string;

  // optional
  active_in_countries: string;
  categories_general: string[];
  categories_sdgs: number[];
  contact_email: string;
  hq_city: string;
  hq_country: string;
  image: string;
  kyc_donors_only: boolean;
  logo: string;
  name: string;
  overview: string;
  registration_number: string;
  social_media_url_facebook: string;
  social_media_url_linkedin: string;
  social_media_url_twitter: string;
  street_address: string;
  tagline: string;
  tier: number /** 1 - 3  */;
  url: string;
    */
  };

  const initial: ProfileWithSettings = {
    ...flatInitial,
    country: {
      name: props.country_of_origin ?? "",
      flag: "" /** let country selector determine flag since not saved in db */,
    },
    image: { name: "", publicUrl: props.image, preview: props.image },
    logo: { name: "", publicUrl: props.logo, preview: props.logo },
  };

  const methods = useForm<ProfileFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...initial,
      initial: flatInitial,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
