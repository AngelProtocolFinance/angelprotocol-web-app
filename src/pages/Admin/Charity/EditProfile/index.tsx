import { yupResolver } from "@hookform/resolvers/yup";
import { country } from "components/CountrySelector";
import { FormError, FormSkeleton } from "components/admin";
import { adminRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { FormProvider, useForm } from "react-hook-form";
import { useEndowment } from "services/aws/useEndowment";
import {
  EndowmentProfile as TProfile,
  EndowmentProfileUpdate,
} from "types/aws";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { schema } from "./schema";
import { FV } from "./types";
import { toProfileUpdate } from "./update";

export default function EditProfile() {
  const { id } = useAdminContext();
  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useEndowment({ id });

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
  const init: EndowmentProfileUpdate = toProfileUpdate({
    type: "initial",
    data: props,
  });

  const defaults: FV = {
    ...init,
    image: {
      name: "",
      publicUrl: props.image ?? "",
      preview: props.image ?? "",
    },
    logo: { name: "", publicUrl: props.logo ?? "", preview: props.logo ?? "" },
    card_img: {
      name: "",
      publicUrl: props.card_img ?? "",
      preview: props.card_img ?? "",
    },
    endow_designation: init.endow_designation
      ? { label: init.endow_designation, value: init.endow_designation }
      : { label: "", value: "" },
    hq_country: country(props.hq_country),
    sdgs: init.sdgs.map((x) => getSDGLabelValuePair(x, unsdgs[x].title)),
    active_in_countries: init.active_in_countries.map((x) => ({
      label: x,
      value: x,
    })),
    overview: { value: props.overview ?? "" },

    //meta
    initial: init,
  };

  const methods = useForm<FV>({
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form initSlug={props.slug} />
    </FormProvider>
  );
}
