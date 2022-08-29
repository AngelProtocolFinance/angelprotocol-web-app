import { useNavigate } from "react-router-dom";
import {
  useRegistrationState,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { UnexpectedStateError } from "errors/errors";
import { appRoutes } from "constants/routes";
import { FORM_ERROR } from "../constants";
import routes from "../routes";
import { Wallet } from "./WalletSubmission";

export default function useRegisterWallet() {
  const { charity } = useRegistrationState();
  const [updateMetadata, { isSuccess, isLoading }] =
    useUpdateCharityMetadataMutation();
  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const registerWallet = async (data: Wallet) => {
    try {
      if (!charity) {
        throw new UnexpectedStateError("Charity data is null");
      }

      const result = await updateMetadata({
        body: { JunoWallet: data.address },
        PK: charity.ContactPerson.PK,
      });

      if ("error" in result) {
        handleError(result.error, "Error updating wallet ❌");
      }

      if (charity.ContactPerson.EmailVerified) {
        navigate(`${appRoutes.register}/${routes.dashboard}`);
      } else {
        navigate(`${appRoutes.register}/${routes.confirmEmail}`);
      }
    } catch (err) {
      handleError(err, FORM_ERROR);
    }
  };

  return { registerWallet, isSuccess, isSubmitting: isLoading };
}
