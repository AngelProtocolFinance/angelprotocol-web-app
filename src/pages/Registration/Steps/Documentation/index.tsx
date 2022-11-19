import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { FileObject } from "types/aws";
import { Asset } from "components/FileDropzone";
import { useRegState, withStepGuard } from "../StepGuard";
import Form from "./Form";
import { schema } from "./schema";

function Documentation() {
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
          auditedFinancialReports: genFileAsset(doc.auditedFinancialReports),
          sdgs: [],
        }
      : {
          proofOfIdentity: genFileAsset([]),
          proofOfRegistration: genFileAsset([]),
          financialStatements: genFileAsset([]),
          auditedFinancialReports: genFileAsset([]),
          website: "",
          hasAuthority: false,
          hasAgreedToTerms: false,
          isKYCRequired: "No",
          sdgs: [],
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

export default withStepGuard(Documentation);
