import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FV } from "./types";
import {
  EndowDesignation,
  EndowmentProfileUpdate,
  EndowmentProfile as TProfile,
} from "types/aws";
import { useProfileQuery } from "services/aws/aws";
import { FormError, FormSkeleton } from "components/admin";
import { adminRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import { getEndowDesignationLabelValuePair } from "./getEndowDesignationLabelValuePair";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { schema } from "./schema";
import { toProfileUpdate } from "./update";

export default function EditProfile() {
  const { id } = useAdminContext();
  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
  } = useProfileQuery({ endowId: id });

  const content =
    isLoading || isFetching ? (
      <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />
    ) : isError || !profile ? (
      <FormError errorMessage="Failed to load profile" />
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

function FormWithContext(props: TProfile & { id: number }) {
  //
  const init: EndowmentProfileUpdate = toProfileUpdate({
    type: "initial",
    data: { ...props, id: props.id, owner: "is not relevant anymore" },
  });

  const defaults: FV = {
    ...init,
    image: {
      name: "",
      publicUrl: props.image ?? "",
      preview: props.image ?? "",
    },
    logo: { name: "", publicUrl: props.logo ?? "", preview: props.logo ?? "" },
    endow_designation: init.endow_designation
      ? getEndowDesignationLabelValuePair(
          init.endow_designation as EndowDesignation
        )
      : { label: "", value: "" },
    hq_country: { flag: "", name: props.hq_country ?? "", code: "" },
    sdgs: init.sdgs.map((x) => getSDGLabelValuePair(x, unsdgs[x].title)),
    active_in_countries: init.active_in_countries.map((x) => ({
      label: x,
      value: x,
    })),

    //meta
    initial: init,
  };

  const methods = useForm<FV>({
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
