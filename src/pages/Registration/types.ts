import type {
  BankingDetails,
  ContactDetails,
  EndowClaim,
  FSAInquiry,
  OrgDetails,
  RegV2,
  TDocumentation,
} from "types/aws";

//REF_ID is global to registration
export type InitReg = {
  reference: string;
  email: string;
  claim?: EndowClaim;
};

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
  data: RegV2.Step1;
};

/** org details */
type RegStep2 = {
  step: 2;
  data: RegV2.Step2;
};

/** fsa inquiry */
type RegStep3 = {
  step: 3;
  data: RegV2.Step3;
};

/** documentation */
export type RegStep4 = {
  step: 4;
  data: RegV2.Step4;
};

/** banking */
type RegStep5 = {
  step: 5;
  data: RegV2.Step5;
};

type RegStep6 = {
  step: 6;
  data: RegV2.Step6;
};

export type RegistrationState =
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4
  | RegStep5
  | RegStep6;

export type RegStep = RegistrationState["step"];
