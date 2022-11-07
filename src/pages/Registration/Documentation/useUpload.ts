import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentationValues } from "pages/Registration/types";
import { FileObject } from "types/aws";
import {
  useRegistrationQuery,
  useUpdateDocumentationMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { Asset } from "components/FileDrop";
import { appRoutes } from "constants/routes";
import { GENERIC_ERROR_MESSAGE } from "../constants";
import routes from "../routes";
import { ipfsUpload } from "./ipfsUpload";

export default function useUpload() {
  const [uploadDocumentation] = useUpdateDocumentationMutation();
  const { application } = useRegistrationQuery();
  const navigate = useNavigate();

  const { handleError } = useErrorContext();

  const upload = useCallback(
    async ({
      website,
      checkedAuthority,
      checkedPolicy,
      un_sdg,
      ...documents
    }: DocumentationValues) => {
      try {
        const previews = await getFilePreviews({ ...documents });

        console.log(previews);

        const result = await uploadDocumentation({
          PK: application.ContactPerson.PK,
          body: {
            Website: website,
            UN_SDG: un_sdg,
            ProofOfIdentity: previews.proofOfIdentity[0],
            ProofOfRegistration: previews.proofOfRegistration[0],
            FinancialStatements: previews.financialStatements,
            AuditedFinancialReports: previews.auditedFinancialReports,
          },
        });

        if ("error" in result) {
          return handleError(result.error, GENERIC_ERROR_MESSAGE);
        }

        const route = application.Metadata.JunoWallet
          ? routes.dashboard
          : routes.additionalInformation;
        navigate(`${appRoutes.register}/${route}`);
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    },
    [application, handleError, uploadDocumentation, navigate]
  );

  return upload;
}

async function getFilePreviews<T extends { [index: string]: Asset }>(
  fields: T
): Promise<{ [key in keyof T]: FileObject[] }> {
  const positions: { [index: string]: [number, number] } = {};
  let pos = 0;
  let files: File[] = [];
  for (const [key, asset] of Object.entries(fields)) {
    const numFiles = asset.files.length;
    positions[key] = [pos, pos + asset.files.length];
    files.push(...asset.files);
    pos += numFiles;
  }
  const urls = await ipfsUpload(files);
  //map file names to urls
  const previews: FileObject[] = files.map(({ name }, i) => ({
    name,
    publicUrl: urls[i],
  }));

  //rebuild object with preview urls
  const result: any = {};
  for (const [key, [start, end]] of Object.entries(positions)) {
    const _previews = previews.slice(start, end);
    //return previous previews if no new urls
    result[key] = _previews.length <= 0 ? fields[key].previews : _previews;
  }

  return result;
}
