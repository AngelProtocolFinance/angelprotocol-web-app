import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  FlatUpdateProfilePayload,
  UpdateProfileValues,
} from "pages/Admin/types";
import { ProfileResponse as TProfile } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useEndowmentProfileQuery } from "services/juno/account";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function EditProfile() {
  const { endowmentId } = useAdminResources();
  const {
    data: profile,
    isLoading,
    isError,
  } = useEndowmentProfileQuery({ id: endowmentId });

  if (isLoading)
    return <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />;
  if (isError || !profile)
    return <FormError errorMessage="Failed to load profile" />;

  return <FormWithContext {...{ ...profile, id: endowmentId }} />;
}

function FormWithContext(props: TProfile & { id: number }) {
  //initialize falsy values
  const initialProfile: Required<FlatUpdateProfilePayload> = {
    id: props.id,
    name: props.name,
    overview: props.overview,
    sdgNum: props.categories.sdgs[0] || 0,
    tier: props.tier || 0,
    logo: props.logo || "",
    image: props.image || "",
    url: props.url || "",
    registration_number: props.registration_number || "",
    street_address: props.street_address || "",
    country_of_origin: props.country_of_origin || "",
    contact_email: props.contact_email || "",
    facebook: props.social_media_urls.facebook || "",
    twitter: props.social_media_urls.twitter || "",
    linkedin: props.social_media_urls.linkedin || "",
    number_of_employees: props.number_of_employees || 1,
    average_annual_budget: props.average_annual_budget || "",
    annual_revenue: props.annual_revenue || "",
    charity_navigator_rating: props.charity_navigator_rating || "",
    endow_type: "",
    // endow_type: prof,
  };
  const methods = useForm<UpdateProfileValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...initialProfile,
      initialProfile,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
