import {
  ContactRoles,
  EndowmentTierNum,
  ReferralMethods,
} from "types/server/aws";
import { FileWrapper } from "components/FileDropzone";

export type RegistrationStep = { completed: boolean };
export type DocumentationStep = RegistrationStep & { tier?: EndowmentTierNum };

export type RegistrationState = {
  stepOne: RegistrationStep;
  stepTwo: RegistrationStep;
  stepThree: DocumentationStep;
  stepFour: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};

export type OptionType = { label: string; value: ContactRoles };
export type ReferralOptionType = { label: string; value: ReferralMethods };
/**forms */
export type DocumentationValues = {
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

export type AdditionalInfoValues = {
  charityOverview: string;
  charityLogo: FileWrapper;
  banner: FileWrapper;
};

export type ContactDetails = {
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
