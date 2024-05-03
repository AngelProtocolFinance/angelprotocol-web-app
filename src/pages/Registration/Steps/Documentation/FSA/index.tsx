import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type {
  FileObject,
  FSADocumentation as TFSADocumentation,
} from "types/aws";
import type { FileDropzoneAsset } from "types/components";
import Form from "./Form";
import { schema } from "./schema";
import type { FormValues, Props } from "./types";

export default function FSADocumentation(props: Props) {
  const { doc } = props;
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: doc
      ? formFormat(doc)
      : {
          ProofOfIdentity: asset([]),
          RegistrationNumber: "",
          ProofOfRegistration: asset([]),
          LegalEntityType: "",
          ProjectDescription: "",
        },
  });

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}

function formFormat(doc: TFSADocumentation): FormValues {
  return {
    //level 1
    ProofOfIdentity: asset([doc.ProofOfRegistration]),
    RegistrationNumber: doc.RegistrationNumber,
    ProofOfRegistration: asset([doc.ProofOfRegistration]),
    LegalEntityType: doc.LegalEntityType,
    ProjectDescription: doc.ProjectDescription,
  };
}

export function asset(previews: FileObject[]): FileDropzoneAsset {
  return { files: [], previews };
}
