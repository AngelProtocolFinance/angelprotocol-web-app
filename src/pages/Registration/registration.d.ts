declare module "@types-page/registration" {
  import { EndowmentTierNum } from "@types-shared/registration";
  import { ContactRoles, ReferralMethods } from "@types-server/aws";
  import { FileWrapper } from "@types-component/file-dropzone";

  type RegistrationStep = { completed: boolean };
  type DocumentationStep = RegistrationStep & { tier?: EndowmentTierNum };

  type RegistrationState = {
    stepOne: RegistrationStep;
    stepTwo: RegistrationStep;
    stepThree: DocumentationStep;
    stepFour: RegistrationStep;
    getIsReadyForSubmit: () => boolean;
  };

  type OptionType = { label: string; value: ContactRoles };
  type ReferralOptionType = { label: string; value: ReferralMethods };
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

  type ContactDetails = {
    charityName: string;
    firstName: string;
    lastName: string;
    email: string;
    goals: string;
    phone: string;
    referralMethod: ReferralMethods;
    otherReferralMethod: string;
    role: ContactRoles;
    otherRole: string;
    checkedPolicy: boolean;
    uniqueID: string;
  };
}
