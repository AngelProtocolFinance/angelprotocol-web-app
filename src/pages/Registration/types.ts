import type {
  FsaDocs,
  Init,
  TaxDeductibleDocs,
} from "@better-giving/registration/models";
import type { CompleteReg } from "@better-giving/registration/step";

export interface Reg extends Omit<CompleteReg, keyof Init> {
  init: Init;
}

type Data<
  Done extends keyof Reg,
  Pending extends Exclude<keyof Reg, Done>,
> = Pick<Reg, Done> & {
  [key in Pending]?: Reg[key];
};

export type Step1Data = Data<"init", "contact">;
type Step2Data = Data<"init" | "contact", "org">;
export type Step3Data = Data<"init" | "contact" | "org", "irs501c3">;
type Step4Data = Omit<
  Data<"init" | "contact" | "org" | "irs501c3", "docs">,
  "docs"
> & {
  docs?: FsaDocs | TaxDeductibleDocs;
};

type Step5Data = Data<
  "init" | "contact" | "org" | "irs501c3" | "docs",
  "banking"
>;
export type Step6Data = Data<
  "init" | "contact" | "org" | "irs501c3" | "docs" | "banking",
  "submission"
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

export type RegStep6 = {
  step: 6;
  data: Step6Data;
};

export type RegistrationState =
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4
  | RegStep5
  | RegStep6;

export type RegStep = RegistrationState["step"];
