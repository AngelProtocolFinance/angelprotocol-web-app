import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { FileObject } from "types/aws";
import { useRegState } from "services/aws/registration/StepGuard";
import { Asset } from "components/FileDropzone";
import Form from "./Form";
import { schema } from "./schema";

export default function Documentation() {
  const {
    data: { documentation: doc },
  } = useRegState<2>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: doc
      ? {
          ...doc,
          proofOfIdentity: genFileAsset(doc.proofOfIdentity),
          proofOfRegistration: genFileAsset(doc.proofOfRegistration),
          financialStatements: genFileAsset(doc.financialStatements),
          annualReports: genFileAsset(doc.annualReports),
        }
      : {
          proofOfIdentity: genFileAsset([]),
          proofOfRegistration: genFileAsset([]),
          financialStatements: genFileAsset([]),
          annualReports: genFileAsset([]),
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

function genFileAsset(previews: FileObject[]): Asset {
  return { files: [], previews };
}
