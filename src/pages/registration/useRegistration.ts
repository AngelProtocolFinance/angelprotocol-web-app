import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { useGetLambdaAuthTokenMutation } from "services/aws/auth";
import { updateUserData } from "services/user/userSlice";
import { useSetter } from "store/accessors";
import { useHistory, useRouteMatch } from "react-router-dom";
import { registration } from "types/routes";
import createAuthToken from "helpers/createAuthToken";

export type ReferInfo = {
  refer: string;
};

export const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export const useRegistration = () => {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const [getTokenData] = useGetLambdaAuthTokenMutation();
  const dispatch = useSetter();
  const history = useHistory();
  const { url } = useRouteMatch();

  const onResume = async (values: ReferInfo) => {
    let response: any = await checkData(values.refer);
    if (response.error) {
      toast.error(response.error.data.message);
    } else {
      // const token: any = await getTokenData(values.refer);
      const token: any = createAuthToken("charity-owner");
      console.log(token);
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
          pathname: `${url}/${registration.status}`,
        });
      else
        history.push({
          pathname: `${url}/${registration.confirm}`,
          state: { is_sent: true },
        });
    }
  };

  return { onResume };
};
