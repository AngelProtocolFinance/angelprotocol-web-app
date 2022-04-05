import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { app, site } from "constants/routes";
import createAuthToken from "helpers/createAuthToken";
import { useNavigate } from "react-router-dom";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { User, UserTypes } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useSetter } from "store/accessors";
import * as Yup from "yup";
import routes from "./routes";

export type ReferInfo = { refer: string };

export const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export const useRegistration = () => {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const dispatch = useSetter();
  const navigate = useNavigate();
  const { showModal } = useSetModal();

  const onResume = async (values: ReferInfo) => {
    let response: any = await checkData(values.refer);
    if (response.error) {
      showModal<PopupProps>(Popup, { message: response.error.data.message });
      return console.log(response.error);
    }

    // const token: any = await getTokenData(values.refer);
    const token: any = createAuthToken(UserTypes.CHARITY_OWNER);
    const data: User = {
      ...response.data.ContactPerson,
      CharityName: response.data.Registration.CharityName,
      CharityName_ContactEmail:
        response.data.Registration.CharityName_ContactEmail,
      RegistrationDate: response.data.Registration.RegistrationDate,
      RegistrationStatus: response.data.Registration.RegistrationStatus,
      token: token,
      TerraWallet: response.data.Metadata?.TerraWallet,
      IsKeyPersonCompleted: !!response.data.KeyPerson,
      IsMetaDataCompleted: !!response.data.Metadata,
      ProofOfIdentity: response.data.Registration.ProofOfIdentity,
      Website: response.data.Registration.Website,
      UN_SDG: response.data.Registration.UN_SDG,
      ProofOfRegistration: response.data.Registration.ProofOfRegistration,
      FinancialStatements: response.data.Registration.FinancialStatements,
      AuditedFinancialReports:
        response.data.Registration.AuditedFinancialReports,
      ProofOfIdentityVerified:
        response.data.Registration.ProofOfIdentityVerified,
      ProofOfRegistrationVerified:
        response.data.Registration.ProofOfRegistrationVerified,
      FinancialStatementsVerified:
        response.data.Registration.FinancialStatementsVerified,
      AuditedFinancialReportsVerified:
        response.data.Registration.AuditedFinancialReportsVerified,
    };
    dispatch(updateUserData(data));
    localStorage.setItem("userData", JSON.stringify(data));
    if (data.EmailVerified) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    } else {
      navigate(`${site.app}/${app.register}/${routes.confirm}`, {
        state: { is_sent: true },
      });
    }
  };

  return { onResume };
};
