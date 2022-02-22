import createAuthToken from "helpers/createAuthToken";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { UserTypes } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useSetter } from "store/accessors";
import * as Yup from "yup";
import routes from "./routes";

export type ReferInfo = {
  refer: string;
};

export const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export const useRegistration = () => {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const dispatch = useSetter();
  const history = useHistory();
  const { url } = useRouteMatch();

  const onResume = async (values: ReferInfo) => {
    let response: any = await checkData(values.refer);
    if (response.error) {
      return console.log(response.error);
    }

    // const token: any = await getTokenData(values.refer);
    const token: any = createAuthToken(UserTypes.CHARITY_OWNER);
    const data = {
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
      ProofOfEmployment: response.data.Registration.ProofOfEmployment,
      EndowmentAgreement: response.data.Registration.EndowmentAgreement,
      ProofOfIdentityVerified:
        response.data.Registration.ProofOfIdentityVerified,
      ProofOfEmploymentVerified:
        response.data.Registration.ProofOfEmploymentVerified,
      EndowmentAgreementVerified:
        response.data.Registration.EndowmentAgreementVerified,
    };
    dispatch(updateUserData(data));
    localStorage.setItem("userData", JSON.stringify(data));
    if (data.EmailVerified)
      history.push({
        pathname: `${url}/${routes.dashboard}`,
      });
    else
      history.push({
        pathname: `${url}/${routes.confirm}`,
        state: { is_sent: true },
      });
  };

  return { onResume };
};
