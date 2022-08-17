import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { UpdateProfileValues } from "pages/Admin/types";
import { UpdateProfilePayload } from "types/server/contracts";
import { Profile } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import FormError from "pages/Admin/common/FormError";
import FormSkeleton from "pages/Admin/common/FormSkeleton";
import { useEndowmentProfileQuery } from "services/juno/account";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import EditForm from "./EditForm";
import { profileEditSchema } from "./profileEditSchema";

export default function ProfileEditor() {
  const { wallet } = useGetWallet();
  const { endowmentId } = useAdminResources();
  const contract = new Account(undefined);
  const {
    data: profile,
    isLoading,
    isError,
  } = useEndowmentProfileQuery(
    contract.profile(
      +endowmentId /**valid id, already verified in useAdminResources */
    )
  );

  if (!wallet)
    return <FormError errorMessage="Please connect wallet to view this page" />;
  if (isLoading) return <FormSkeleton />;
  if (isError || !profile)
    return <FormError errorMessage="Failed to load profile" />;

  return (
    <ProfileEditContext {...(profile || ({} as any))}>
      <EditForm />
    </ProfileEditContext>
  );
}

function ProfileEditContext(props: Profile) {
  //initialize falsy values
  const initialProfile: Required<UpdateProfilePayload> = {
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
    resolver: yupResolver(profileEditSchema),
  });
  return (
    <FormProvider {...methods}>
      <EditForm />
    </FormProvider>
  );
}
