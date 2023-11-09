import { OverrideProperties } from "type-fest";
import {
  BankDetails,
  ContactRoles,
  InitReg,
  OrgDetails,
  OrgDocs,
  ReferralMethods,
  RegistrantDetails,
  RegistrationMeta,
  RegistrationStatus,
} from "types/aws";
import { EndowmentTierNum } from "types/aws";
import { Country } from "types/countries";
import { UNSDG_NUMS } from "types/lists";
import { Optional } from "types/utils";
import { OptionType } from "types/utils";
import { Asset } from "components/registration";

//REF_ID is global to registration
export type NewRegistrationPayload = Pick<
  InitReg,
  "registrantEmail" | "registrantName"
>;

//STEP 1 - RegistrantDetails
export type StepOneData = OverrideProperties<
  RegistrantDetails & RegistrationMeta & NewRegistrationPayload,
  {
    orgRole: OptionType<ContactRoles>;
    referralMethod: OptionType<ReferralMethods>;
  }
>;

//STEP 2
export type Documentation = {
  //registrant identity
  proofOfIdentity: Asset;

  //organization details
  ein: string;
  proofOfRegistration: Asset;
  website: string;
  sdgs: OptionType<UNSDG_NUMS>[];

  tier: EndowmentTierNum;

  hqCountry: Country;
  endowDesignation: OptionType<string>;
  activeInCountries: OptionType<string>[];
  isAuthorizedToReceiveTaxDeductibleDonations: "Yes" | "No";
  fiscalSponsorshipAgreementSigningURL: string;
  signedFiscalSponsorshipAgreement: string;
  legalEntityType: string;
  projectDescription: string;

  //others
  isAnonymousDonationsAllowed: "Yes" | "No";
};

export type CompleteRegistration = {
  init: InitReg;
  registrant: RegistrantDetails;
  org: OrgDetails;
  docs: OrgDocs;
  banking: BankDetails;
  endowId?: number; //created
};

type Step1Data = Optional<
  Pick<CompleteRegistration, "init" | "contact">,
  "contact"
>;

type Step2Data = Optional<
  Pick<CompleteRegistration, "init" | "contact" | "documentation">,
  "documentation"
>;

type RegStep1 = {
  step: 1;
  data: Step1Data;
};

type RegStep2 = {
  step: 2;
  data: Step2Data;
};

type RegStep3 = {
  step: 3;
  data: CompleteRegistration & { status: RegistrationStatus };
};

export type RegistrationState = RegStep1 | RegStep2 | RegStep3;

export type RegStep = RegistrationState["step"];
