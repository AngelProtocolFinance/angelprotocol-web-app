import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { app, site } from "constants/routes";
import createAuthToken from "helpers/createAuthToken";
import { useNavigate } from "react-router-dom";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { CharityData, Registration } from "services/aws/types";
import {
  CharityMetadata,
  DocumentationLevel,
  RegistrationState,
  User,
  UserTypes,
} from "services/user/types";
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
    const result = await checkData(values.refer);

    const dataResult = result as {
      data: CharityData;
      error: FetchBaseQueryError | SerializedError;
    };

    if (dataResult.error) {
      showModal<PopupProps>(Popup, {
        message:
          "No active charity application found with this registration reference",
      });
      return console.log(dataResult.error);
    }

    const { data } = dataResult;

    // const token: any = await getTokenData(values.refer);
    const token: any = createAuthToken(UserTypes.CHARITY_OWNER);
    const userData: User = {
      ...data.ContactPerson,
      CharityName: data.Registration.CharityName,
      CharityName_ContactEmail: data.Registration.CharityName_ContactEmail,
      RegistrationDate: data.Registration.RegistrationDate,
      RegistrationStatus: data.Registration.RegistrationStatus,
      token: token,
      IsMetaDataCompleted:
        !!data.Metadata.TerraWallet &&
        !!data.Metadata.CharityOverview &&
        !!data.Metadata.CharityLogo.sourceUrl &&
        !!data.Metadata.Banner.sourceUrl,
      Metadata: getMetadata(data),
      ProofOfIdentity: data.Registration.ProofOfIdentity || [],
      Website: data.Registration.Website,
      UN_SDG: data.Registration.UN_SDG,
      ProofOfRegistration: data.Registration.ProofOfRegistration || [],
      FinancialStatements: data.Registration.FinancialStatements || [],
      AuditedFinancialReports: data.Registration.AuditedFinancialReports || [],
      ProofOfIdentityVerified: data.Registration.ProofOfIdentityVerified,
      ProofOfRegistrationVerified:
        data.Registration.ProofOfRegistrationVerified,
      FinancialStatementsVerified:
        data.Registration.FinancialStatementsVerified,
      AuditedFinancialReportsVerified:
        data.Registration.AuditedFinancialReportsVerified,
      State: getRegistrationState(data),
    };
    dispatch(updateUserData(userData));
    localStorage.setItem("userData", JSON.stringify(userData));
    if (userData.EmailVerified) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    } else {
      navigate(`${site.app}/${app.register}/${routes.confirm}`, {
        state: { is_sent: true },
      });
    }
  };

  return { onResume };
};

function getMetadata({ Metadata }: CharityData): CharityMetadata {
  return {
    Banner: Metadata?.Banner || { name: "" },
    CharityLogo: Metadata?.CharityLogo || { name: "" },
    CharityOverview: Metadata?.CharityOverview || "",
    TerraWallet: Metadata?.TerraWallet || "",
  };
}

function getRegistrationState(data: CharityData): RegistrationState {
  return {
    stepOne: { completed: !!data.ContactPerson.PK },
    stepTwo: { completed: !!data.Metadata.TerraWallet },
    stepThree: getStepThree(data.Registration),
    stepFour: {
      completed:
        !!data.Metadata.CharityLogo &&
        !!data.Metadata.Banner &&
        !!data.Metadata.CharityOverview,
    },
  };
}

function getStepThree(registration: Registration) {
  const levelOneDataExists =
    !!registration.ProofOfIdentity?.length &&
    !!registration.ProofOfRegistration?.length &&
    !!registration.Website;
  const levelTwoDataExists =
    !!registration.FinancialStatements?.length &&
    (registration.UN_SDG || -1) >= 0;
  const levelThreeDataExists = !!registration.AuditedFinancialReports?.length;

  const level: DocumentationLevel = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : 0;

  return { completed: levelOneDataExists, level };
}
