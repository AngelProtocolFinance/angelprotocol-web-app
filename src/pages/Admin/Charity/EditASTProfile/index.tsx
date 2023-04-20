import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FlatFormValues, FormValues } from "./types";
import { endow } from "services/types";
import { ASTProfile } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useProfileQuery } from "services/aws/aws";
import Seo from "components/Seo";
import { FormError, FormSkeleton } from "components/admin";
import { APP_NAME, DAPP_DOMAIN } from "constants/common";
import Form from "./Form";
import { schema } from "./schema";

export default function EditASTProfile() {
  const { id } = useAdminResources();
  const { data: profile, isLoading, isFetching, isError } = useProfileQuery(id);

  if (isLoading || isFetching)
    return <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />;
  if (isError || !profile || endow(profile))
    return <FormError errorMessage="Failed to load profile" />;

  return <FormWithContext {...profile} />;
}

function FormWithContext(props: ASTProfile) {
  // could just add to useForm.defaultValue - but not Partial here
  const flatInitial: FlatFormValues = {
    name: props.name,
    image: props.image || "",
    logo: props.logo || "",
    overview: props.overview || "",
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
    initial: flatInitial,
  };

  const methods = useForm<FormValues>({
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Seo
        title={`${props.name} profile update - ${APP_NAME}`}
        description={`${(props?.overview ?? "").slice(0, 140)}`}
        name={props.name}
        image={props.logo}
        url={`${DAPP_DOMAIN}/profile/${props.id}`}
      />
      <Form />
    </FormProvider>
  );
}
