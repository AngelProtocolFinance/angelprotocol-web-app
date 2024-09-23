import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type { FileObject, RegV2 } from "types/aws";
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
          proof_of_identity: asset([]),
          registration_number: "",
          proof_of_reg: asset([]),
          legal_entity_type: "",
          project_description: "",
        },
  });

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}

function formFormat(doc: RegV2.FsaDocs): FormValues {
  return {
    //level 1
    outdated: doc.outdated,
    proof_of_identity: asset([doc.proof_of_identity]),
    registration_number: doc.registration_number,
    proof_of_reg: asset([doc.proof_of_reg]),
    legal_entity_type: doc.legal_entity_type,
    project_description: doc.project_description,
  };
}

export function asset(previews: FileObject[]): FileDropzoneAsset {
  return { files: [], previews };
}
