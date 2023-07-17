import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FV } from "./types";
import { Profile as TProfile } from "services/types";
import { useProfileQuery } from "services/aws/aws";
import QueryLoader from "components/QueryLoader";
import { FormError, FormSkeleton } from "components/admin";
import { adminRoutes } from "constants/routes";
import { isTooltip, useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import { ops } from "./ops";
import { schema } from "./schema";

export default function CreateProgram() {
  const { id } = useAdminContext(ops);
  const queryState = useProfileQuery(id);

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />,
        error: <FormError errorMessage="Failed to load programs" />,
      }}
    >
      {(profile) => (
        <>
          <Seo title="Edit Profile" url={`${adminRoutes.edit_profile}/${id}`} />
          <Context {...profile} />
        </>
      )}
    </QueryLoader>
  );
}

function Context(props: TProfile) {
  const { txResource } = useAdminContext(ops);

  const defaults: FV = {
    title: "",
    description: "",
    image: {
      name: "",
      publicUrl: props.image ?? "",
      preview: props.image ?? "",
    },
  };

  const methods = useForm<FV>({
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });

  const tooltip = isTooltip(txResource) ? txResource : undefined;

  return (
    <FormProvider {...methods}>
      <Form tooltip={tooltip} />
    </FormProvider>
  );
}
