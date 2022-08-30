import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { UpdateProfileValues } from "pages/Admin/types";
import { UpdateProfilePayload } from "types/contracts";
import { Profile as TProfile } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useEndowmentProfileQuery } from "services/juno/account";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { FormError, FormSkeleton } from "components/admin";
import EditForm from "./Form";
import { schema } from "./schema";

export default function Profile() {
  const { wallet } = useGetWallet();
  const { endowmentId } = useAdminResources();
  const {
    data: profile,
    isLoading,
    isError,
  } = useEndowmentProfileQuery({ id: endowmentId });

  if (!wallet)
    return <FormError errorMessage="Please connect wallet to view this page" />;
  if (isLoading) return <FormSkeleton />;
  if (isError || !profile)
    return <FormError errorMessage="Failed to load profile" />;

  return (
    <ProfileEditContext {...{ ...profile, id: endowmentId }}>
      <EditForm />
    </ProfileEditContext>
  );
}

function ProfileEditContext(props: TProfile & { id: number }) {
  //initialize falsy values
  const initialProfile: Required<UpdateProfilePayload> = {
    id: props.id,
    name: props.name,
    overview: props.overview,
    un_sdg: props.un_sdg || 0,
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
    defaultValues: { ...initialProfile, initialProfile },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <EditForm />
    </FormProvider>
  );
}
