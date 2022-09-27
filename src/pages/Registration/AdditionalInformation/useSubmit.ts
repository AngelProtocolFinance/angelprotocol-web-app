import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdditionalInfoValues } from "pages/Registration/types";
import {
  useRegistrationQuery,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { appRoutes } from "constants/routes";
import routes from "../routes";
import getUploadBody from "./getUploadBody";

export default function useSubmit() {
  const [updateMetadata] = useUpdateCharityMetadataMutation();
  const { charity } = useRegistrationQuery();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit = useCallback(
    async (values: AdditionalInfoValues) => {
      try {
        const body = await getUploadBody(values);

        const result = await updateMetadata({
          PK: charity.ContactPerson.PK,
          body,
        });

        if ("error" in result) {
          return handleError(result.error, "Error updating profile ❌");
        }

        const route = charity.Metadata.JunoWallet
          ? routes.dashboard
          : routes.wallet;
        navigate(`${appRoutes.register}/${route}`);
      } catch (error) {
        handleError(error, "Error updating profile ❌");
      }
    },
    [charity, handleError, updateMetadata, navigate]
  );

  return { submit };
}
