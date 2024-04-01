import { Except } from "type-fest";
import {
  BankingDetails,
  ContactDetails,
  EndowClaim,
  FSAInquiry,
  NonFSADocumentation,
  OrgDetails,
  RegistrationStatus,
  TDocumentation,
} from "types/aws";

//REF_ID is global to registration
export type InitReg = {
  reference: string;
  email: string;
  claim?: EndowClaim;
};

export type FormFSAInquiry = FSAInquiry;

export type FormNonFSADocumentation = Except<NonFSADocumentation, "DocType">;

export type CompleteRegistration = {
  init: InitReg;
  contact: ContactDetails & { orgName: string };
  orgDetails: OrgDetails;
  fsaInquiry: FSAInquiry;
  documentation: TDocumentation["Documentation"];
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
export type Step3Data = Data<"init" | "contact" | "orgDetails", "fsaInquiry">;
type Step4Data = Data<
  "init" | "contact" | "orgDetails" | "fsaInquiry",
  "documentation"
>;
type Step5Data = Data<
  "init" | "contact" | "orgDetails" | "fsaInquiry" | "documentation",
  "banking"
>;

/** contact details */
type RegStep1 = {
  step: 1;
  data: Step1Data;
};

/** org details */
type RegStep2 = {
  step: 2;
  data: Step2Data;
};

/** fsa inquiry */
type RegStep3 = {
  step: 3;
  data: Step3Data;
};

/** documentation */
export type RegStep4 = {
  step: 4;
  data: Step4Data;
};

/** banking */
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
