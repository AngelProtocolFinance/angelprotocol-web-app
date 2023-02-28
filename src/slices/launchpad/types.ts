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
  about: About;
  management: Management;
  whitelists: Whitelists;
  maturity: Maturity;
  splits: Splits;
  fees: Fees;
};

export type Init = {};
type Step1 = Pick<Completed, "about">;
type Step2 = Step1 & Pick<Completed, "management">;
type Step3 = Step2 & Pick<Completed, "whitelists">;
type Step4 = Step3 & Pick<Completed, "maturity">;
type Step5 = Step4 & Pick<Completed, "splits">;
type Step6 = Step4 & Pick<Completed, "fees">;

export type LaunchState =
  | Init
  | Step1
  | Step2
  | Step3
  | Step4
  | Step5
  | Step6
  | Completed;

export type Steps = keyof Completed;
