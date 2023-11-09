import { Except, OverrideProperties } from "type-fest";
import {
  BankingDetails,
  ContactDetails,
  FSADocumentation,
  FSAInquiry,
  NonFSADocumentation,
  OrgDetails,
  RegistrationStatus,
  TDocumentation,
} from "types/aws";
import { Asset } from "components/registration";

//REF_ID is global to registration
export type InitReg = {
  reference: string;
  email: string;
};

export type FormFSAInquiry = FSAInquiry;
export type FormFSADocumentation = OverrideProperties<
  Except<
    FSADocumentation,
    | "DocType"
    | "FiscalSponsorshipAgreementSigningURL"
    | "SignedFiscalSponsorshipAgreement"
  >,
  {
    ProofOfIdentity: Asset;
    ProofOfRegistration: Asset;
  }
>;
export type FormNonFSADocumentation = Except<NonFSADocumentation, "DocType">;

export type CompleteRegistration = {
  init: InitReg;
  contact: ContactDetails & { orgName: string };
  orgDetails: OrgDetails;
  fsaInquiry: FSAInquiry;
  documentation: TDocumentation;
  banking: BankingDetails;
  endowId?: number;
};

type Data<
  Done extends keyof CompleteRegistration,
  Pending extends Exclude<keyof CompleteRegistration, Done>,
> = Pick<CompleteRegistration, Done> & {
  [key in Pending]?: CompleteRegistration[key];
};

type Step1Data = Data<"init", "contact">;
type Step2Data = Data<"init" | "contact", "orgDetails">;
type Step3Data = Data<"init" | "contact" | "orgDetails", "fsaInquiry">;
type Step4Data = Data<
  "init" | "contact" | "orgDetails" | "fsaInquiry",
  "documentation"
>;
type Step5Data = Data<
  "init" | "contact" | "orgDetails" | "fsaInquiry" | "documentation",
  "banking"
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
  data: Step3Data;
};

type RegStep4 = {
  step: 4;
  data: Step4Data;
};
type RegStep5 = {
  step: 5;
  data: Step5Data;
};

type RegStep6 = {
  step: 6;
  data: CompleteRegistration & { status: RegistrationStatus };
};

export type RegistrationState =
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4
  | RegStep5
  | RegStep6;

export type RegStep = RegistrationState["step"];
