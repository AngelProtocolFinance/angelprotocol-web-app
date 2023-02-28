import { CW4Member } from "types/contracts";

type About = { name: string; tagline: string };
type Management = {
  members: CW4Member;
  //proposal config defaulted to percentage
  proposal: {
    threshold: number;
    duration: number;
    isAutoExecute: boolean;
  };
};

type Whitelists = {
  contributors: string[];
  beneficiaries: string[];
};

type Maturity = {
  date: string;
  beneficiaries: string[];
};
type Splits =
  | number /** user split not allowed */
  | { default: number; min: number; max: number };

type Fees = {
  withdrawal: Fee;
  deposit: Fee;
  earnings: Fee;
};
type Fee = { isActive: boolean; receiver: string; rate: number };

export type Completed = {
  1: About;
  2: Management;
  3: Whitelists;
  4: Maturity;
  5: Splits;
  6: Fees;
};

type Pending = Partial<Completed>;
type InitStep = 0;
type CompleteStep = 7;

export type Init = {};
type Step1 = Pick<Pending, 1>;
type Step2 = Step1 & Pick<Pending, 2>;
type Step3 = Step2 & Pick<Pending, 3>;
type Step4 = Step3 & Pick<Pending, 4>;
type Step5 = Step4 & Pick<Pending, 5>;
type Step6 = Step5 & Pick<Pending, 6>;

export type Steps = keyof Completed;

export type Progress = InitStep | Steps | CompleteStep;
export type LaunchState = { curr: Progress; progress: Progress } & (
  | Init
  | Step1
  | Step2
  | Step3
  | Step4
  | Step5
  | Step6
  | Completed
);
