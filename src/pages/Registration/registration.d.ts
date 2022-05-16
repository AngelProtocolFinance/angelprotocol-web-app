declare module "@types-page/registration" {
  import { EndowmentTierNum } from "@types-shared/registration";
  import { FileWrapper } from "@types-component/file-dropzone";

  type DecodedJWTData<T> = T & {
    authorization: string;
    exp: number;
    iat: number;
    user: string;
  };

  type RegistrationStep = { completed: boolean };
  type DocumentationStep = RegistrationStep & { tier?: EndowmentTierNum };

  type RegistrationState = {
    stepOne: RegistrationStep;
    stepTwo: RegistrationStep;
    stepThree: DocumentationStep;
    stepFour: RegistrationStep;
    getIsReadyForSubmit: () => boolean;
  };

  type OptionType = { label: string; value: any };
  type ContactRoles =
    | "president"
    | "vice-president"
    | "secretary"
    | "treasurer"
    | "ceo"
    | "cfo"
    | "other";

  /**forms */
  type DocumentationValues = {
    // Expects an array because FileDropzone component always returns an array of Files,
    // so this way it's easier to handle (Yup validation ensures single file uploaded)
    proofOfIdentity: FileWrapper;
    proofOfRegistration: FileWrapper;
    financialStatements: FileWrapper[];
    auditedFinancialReports: FileWrapper[];
    website: string;
    checkedAuthority: boolean;
    checkedPolicy: boolean;
    un_sdg: number;
  };

  type AdditionalInfoValues = {
    charityOverview: string;
    charityLogo: FileWrapper;
    banner: FileWrapper;
  };

  type ContactValues = {
    charityName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: ContactRoles;
    otherRole: string;
    checkedPolicy: boolean;
    uniqueID: string;
  };
}
