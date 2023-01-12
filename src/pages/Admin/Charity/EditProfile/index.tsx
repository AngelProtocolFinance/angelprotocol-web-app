import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  FlatProfileWithSettings,
  ProfileFormValues,
  ProfileWithSettings,
} from "pages/Admin/types";
import { ProfileResponse } from "types/contracts";
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

function FormWithContext(props: ProfileResponse & { id: number }) {
  //initialize falsy values
  const flatInitial: Required<FlatProfileWithSettings> = {
    id: props.id,
    overview: props.overview,
    url: props.url || "",
    registration_number: props.registration_number || "",
    street_address: props.street_address || "",
    country: props.country_of_origin || "",
    contact_email: props.contact_email || "",
    facebook: props.social_media_urls.facebook || "",
    twitter: props.social_media_urls.twitter || "",
    linkedin: props.social_media_urls.linkedin || "",

    //endowment settings
    name: props.name,
    image: props.image || "",
    logo: props.logo || "",
    sdgs: props.categories.sdgs || 0,
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
