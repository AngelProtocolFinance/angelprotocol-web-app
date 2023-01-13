import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  ProfileFormValues,
  ProfileUpdate,
  ProfileWithSettings,
} from "pages/Admin/types";
import { Profile } from "types/aws";
import "types/contracts";
import { EndowmentDetails } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useProfileQuery } from "services/aws/aws";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function EditProfile() {
  const { endowmentId, endowment } = useAdminResources();
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

  return (
    <FormWithContext {...profile} id={endowmentId} endowment={endowment} />
  );
}

function FormWithContext(
  props: Profile & { id: number; endowment: EndowmentDetails }
) {
  //initialize falsy values
  const flatInitial: Required<ProfileUpdate> = {
    id: props.id,
    overview: props.overview,
    url: props.url || "",
    registration_number: props.registration_number || "",
    street_address: props.street_address || "",
    hq_country: props.hq.country || "",
    hq_city: props.hq.city || "",
    contact_email: props.contact_email || "",
    social_media_url_facebook: props.social_media_urls.facebook || "",
    social_media_url_twitter: props.social_media_urls.twitter || "",
    social_media_url_linkedin: props.social_media_urls.linkedin || "",

    //endowment settings
    name: props.name,
    image: props.image || "",
    logo: props.logo || "",
    categories_sdgs: props.categories.sdgs,
    categories_general: props.categories.general,
    owner: props.endowment.owner,
    active_in_countries: props.active_in_countries || [],
    annual_revenue: props.annual_revenue || "",
    average_annual_budget: props.average_annual_budget || "",
    charity_navigator_rating: props.charity_navigator_rating || "",
    kyc_donors_only: props.endowment.kyc_donors_only,
    number_of_employees: props.number_of_employees || 1,
    tagline: props.tagline || "",
  };

  const initial: ProfileWithSettings = {
    ...flatInitial,
    hq_country: {
      name: flatInitial.hq_country,
      flag: "" /** let country selector determine flag since not saved in db */,
    },
    image: { name: "", publicUrl: props.image, preview: props.image },
    logo: { name: "", publicUrl: props.logo, preview: props.logo },
    categories_sdg: flatInitial.categories_sdgs[0],
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
