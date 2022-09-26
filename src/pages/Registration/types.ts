import { ContactRoles, ReferralMethods } from "types/aws";
import { UNSDG_NUMS } from "types/lists";
import { FileWrapper } from "components/FileDropzone";

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
  un_sdg: UNSDG_NUMS;
};

export type AdditionalInfoValues = {
  charityOverview: string;
  charityLogo: FileWrapper;
  banner: FileWrapper;
  kycDonorsOnly: boolean;
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
