import type { RegV2 } from "types/aws";

type InitKeys = keyof RegV2.Init;
export type CompleteReg = Omit<RegV2.Step6, InitKeys> & {
  init: RegV2.Init;
};

type Data<
  Done extends keyof CompleteReg,
  Pending extends Exclude<keyof CompleteReg, Done>,
> = Pick<CompleteReg, Done> & {
  [key in Pending]?: CompleteReg[key];
};

type Step1Data = Data<"init", "contact">;
type Step2Data = Data<"init" | "contact", "org">;
export type Step3Data = Data<"init" | "contact" | "org", "irs501c3">;
type Step4Data = Omit<
  Data<"init" | "contact" | "org" | "irs501c3", "docs">,
  "docs"
> & {
  // override fsa docs required in step 5 member
  docs?: RegV2.FsaDocs | RegV2.TaxDeductibleDocs;
};
type Step5Data = Data<
  "init" | "contact" | "org" | "irs501c3" | "docs",
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
  data: CompleteReg;
};

export type RegistrationState =
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4
  | RegStep5
  | RegStep6;

export type RegStep = RegistrationState["step"];
