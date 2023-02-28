/** Types primed to be for form usage */
export type Member = { addr: string; weight: string };
export type TAbout = { name: string; tagline: string };
export type TManagement = {
  members: Member[];
  //proposal config defaulted to percentage
  proposal: {
    threshold: string; // "1" - "100"
    duration: string; // in hours
    isAutoExecute: boolean;
  };
};

export type TWhitelists = {
  contributors: string[];
  beneficiaries: string[];
};

export type Beneficiary = {
  addr: string;
  share: string; // "1" - "100"
};
export type TMaturity = {
  date: string;
  beneficiaries: Beneficiary[];
};

export type UserSplit = { default: string; min: string; max: string };
export type TSplits = string /** user split not allowed */ | UserSplit;

export type TFees = {
  withdrawal: TFee;
  deposit: TFee;
  earnings: TFee;
};

type TFee = {
  isActive: boolean;
  receiver: string;
  rate: string /* "1" - "100" */;
};

export type Completed = {
  1: TAbout;
  2: TManagement;
  3: TWhitelists;
  4: TMaturity;
  5: TSplits;
  6: TFees;
};

type Pending = Partial<Completed>;
type CompleteStep = 7;

type Step1 = Pick<Pending, 1>;
type Step2 = Step1 & Pick<Pending, 2>;
type Step3 = Step2 & Pick<Pending, 3>;
type Step4 = Step3 & Pick<Pending, 4>;
type Step5 = Step4 & Pick<Pending, 5>;
type Step6 = Step5 & Pick<Pending, 6>;

export type Steps = keyof Completed;

export type Progress = Steps | CompleteStep;
export type LaunchState = { progress: Progress } & (
  | Step1
  | Step2
  | Step3
  | Step4
  | Step5
  | Step6
  | Completed
);
