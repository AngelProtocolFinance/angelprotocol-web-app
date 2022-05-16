import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  EndowmentAdminParams,
  UpdateProfileValues,
} from "@types-page/endowment-admin";
import { UpdateProfilePayload } from "@types-server/contracts";
import { Profile } from "@types-server/contracts";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useEndowmentProfile } from "services/terra/account/queriers";
import useWalletContext from "hooks/useWalletContext";
import EditForm from "./EditForm";
import { profileEditSchema } from "./profileEditSchema";

export default function ProfileEditor() {
  const { wallet } = useWalletContext();
  const { address: endowment_addr } = useParams<EndowmentAdminParams>();
  const { profile, isProfileLoading, isProfileError } = useEndowmentProfile(
    endowment_addr!
  );

  if (!wallet)
    return <FormError errorMessage="Please connect wallet to view this page" />;
  if (isProfileLoading) return <FormSkeleton />;
  if (isProfileError || !profile)
    return <FormError errorMessage="Failed to load profile" />;

  return (
    <ProfileEditContext {...(profile || ({} as any))}>
      <EditForm />
    </ProfileEditContext>
  );
}

function ProfileEditContext(props: Profile) {
  const initialProfile: UpdateProfilePayload = {
    name: props.name,
    overview: props.overview,
    un_sdg: props.un_sdg,
    tier: props.tier,
    logo: props.logo,
    image: props.image,
    url: props.url,
    registration_number: props.registration_number,
    street_address: props.street_address,
    country_of_origin: props.country_of_origin,
    contact_email: props.contact_email,
    facebook: props.social_media_urls.facebook,
    twitter: props.social_media_urls.twitter,
    linkedin: props.social_media_urls.linkedin,
    number_of_employees: props.number_of_employees,
    average_annual_budget: props.average_annual_budget,
    annual_revenue: props.annual_revenue,
    charity_navigator_rating: props.charity_navigator_rating,
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
