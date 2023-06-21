import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FlatFormValues, FormValues } from "./types";
import { Profile as TProfile, endow } from "services/types";
import { useProfileQuery } from "services/aws/aws";
import { FormError, FormSkeleton } from "components/admin";
import { adminRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import ReadOnlyProfile from "./ReadOnlyProfile";
import { getEndowDesignationLabelValuePair } from "./getEndowDesignationLabelValuePair";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { ops } from "./ops";
import { schema } from "./schema";

export default function EditProfile() {
  const { id, txResource } = useAdminContext(ops);
  const { data: profile, isLoading, isFetching, isError } = useProfileQuery(id);

  const content =
    isLoading || isFetching ? (
      <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />
    ) : isError || !profile ? (
      <FormError errorMessage="Failed to load profile" />
    ) : typeof txResource === "string" ? (
      <ReadOnlyProfile {...profile} tooltip={txResource} />
    ) : (
      <FormWithContext {...profile} />
    );

  return (
    <>
      <Seo title="Edit Profile" url={`${adminRoutes.edit_profile}/${id}`} />
      {content}
    </>
  );
}

function FormWithContext(props: TProfile) {
  const { active_in_countries = [] } = props;
  const designation = endow(props) ? props.endow_designation : "";
  const sdgs = endow(props) ? props.categories.sdgs : [];
  // could just add to useForm.defaultValue - but not Partial here
  const flatInitial: FlatFormValues = {
    name: props.name,
    categories_sdgs: sdgs,
    endow_designation: designation,
    hq_country: props.hq_country ?? "",
    active_in_countries: active_in_countries,
    image: props.image || "",
    logo: props.logo || "",
    kyc_donors_only: props.kyc_donors_only || false,
    overview: props.overview ?? "",
    url: props.url || "",
    published: props.published || false,
    registration_number: props.registration_number || "",
    social_media_url_facebook: props.social_media_urls?.facebook || "",
    social_media_url_linkedin: props.social_media_urls?.linkedin || "",
    social_media_url_twitter: props.social_media_urls?.twitter || "",
    social_media_url_discord: props.social_media_urls?.discord || "",
    social_media_url_instagram: props.social_media_urls?.instagram || "",
    social_media_url_youtube: props.social_media_urls?.youtube || "",
    social_media_url_tiktok: props.social_media_urls?.tiktok || "",
    street_address: props.street_address || "",
    tagline: props.tagline,
  };

  const defaults: FormValues = {
    ...flatInitial,
    image: {
      name: "",
      publicUrl: props.image ?? "",
      preview: props.image ?? "",
    },
    logo: { name: "", publicUrl: props.logo ?? "", preview: props.logo ?? "" },
    endow_designation: designation
      ? getEndowDesignationLabelValuePair(designation)
      : { label: "", value: "" },
    hq_country: { flag: "", name: props.hq_country ?? "", code: "" },
    categories_sdgs: sdgs.map((x) => getSDGLabelValuePair(x, unsdgs[x].title)),
    active_in_countries: active_in_countries.map((x) => ({
      label: x,
      value: x,
    })),

    //meta
    type: props.type,
    initial: flatInitial,
  };

  const methods = useForm<FormValues>({
    defaultValues: defaults,
    resolver: yupResolver(schema),
    context: { isEndow: props.type === "endowment" },
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
