import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { FileObject } from "types/aws";
import {
  useRegState,
  withStepGuard,
} from "services/aws/registration/StepGuard";
import { ImgLink } from "components/ImgEditor";
import Form from "./Form";
import { schema } from "./schema";

function AdditionalInformation() {
  const {
    data: { profile, init },
  } = useRegState<3>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: profile
      ? {
          ...profile,
          banner: toImgLink(profile.banner),
          logo: toImgLink(profile.logo),
          overview: profile.overview,
          ref: init.reference,
        }
      : {
          banner: { name: "", preview: "", publicUrl: "" },
          logo: { name: "", preview: "", publicUrl: "" },
          ref: init.reference,
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

function toImgLink(file?: FileObject): ImgLink {
  if (file) {
    return { ...file, preview: file.publicUrl };
  } else {
    return { name: "", preview: "", publicUrl: "" };
  }
}

export default withStepGuard(AdditionalInformation);
