import { ContactRoles, ReferralMethods } from "types/aws";
import { UNSDG_NUMS } from "types/lists";
import { Asset } from "components/FileDrop";
import { ImgLink } from "components/ImgEditor";

export type OptionType = { label: string; value: ContactRoles };
export type ReferralOptionType = { label: string; value: ReferralMethods };

export type DocumentationValues = {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  auditedFinancialReports: Asset;
  website: string;
  checkedAuthority: boolean;
  checkedPolicy: boolean;
  un_sdg: UNSDG_NUMS;
};

export type AdditionalInfoValues = {
  charityOverview: string;
  charityLogo: ImgLink;
  banner: ImgLink;
  kycDonorsOnly: boolean;
};

export type ContactDetails = {
  organizationName: string;
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
