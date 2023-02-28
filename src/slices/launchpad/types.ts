import { CW4Member } from "types/contracts";

export type TAbout = { name: string; tagline: string };
export type TManagement = {
  members: CW4Member[];
  //proposal config defaulted to percentage
  proposal: {
    threshold: number;
    duration: number;
    isAutoExecute: boolean;
  };
};

export type TWhitelists = {
  contributors: string[];
  beneficiaries: string[];
};

export type Beneficiary = {
  addr: string;
  share: number;
};
export type TMaturity = {
  date: string;
  beneficiaries: Beneficiary[];
};

export type TSplits =
  | number /** user split not allowed */
  | { default: number; min: number; max: number };

export type TFees = {
  withdrawal: TFee;
  deposit: TFee;
  earnings: TFee;
};

type TFee = { isActive: boolean; receiver: string; rate: number };

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
