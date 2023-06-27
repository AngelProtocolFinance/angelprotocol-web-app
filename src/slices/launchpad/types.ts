import { Fee, Fees, Splits as TSplits } from "types/ast";

export type { Fee as TFee, TSplits };

/** Types primed to be for form usage */
export type TAbout = { name: string; tagline: string };
export type TManagement = {
  members: string[];
  //proposal config defaulted to percentage
  proposal: {
    threshold: number; // integer
    isAutoExecute: boolean;
    duration: string;
  };
};

export type TWhitelists = {
  contributors: string[];
  beneficiaries: string[];
};

export type TMaturity = {
  willMature: boolean;
  date: string;
  beneficiaries: string[];
};

export type TFees = Fees & { referral_id?: number };

export type Completed = {
  1: TAbout;
  2: TManagement;
  3: TWhitelists;
  4: TMaturity;
  5: TSplits;
  6: TFees;
  7: null;
};

type Pending = Partial<Completed>;
type CompleteStep = 8;
type Step1 = Pick<Pending, 1>;
type Step2 = Step1 & Pick<Pending, 2>;
type Step3 = Step2 & Pick<Pending, 3>;
type Step4 = Step3 & Pick<Pending, 4>;
type Step5 = Step4 & Pick<Pending, 5>;
type Step6 = Step5 & Pick<Pending, 6>;
type Step7 = Step6 & Pick<Pending, 7>;

export type Steps = keyof Completed;

export type Progress = Steps | CompleteStep;

type Meta = { progress: Progress };

export type LaunchState = Meta &
  (Step1 | Step2 | Step3 | Step4 | Step5 | Step6 | Step7 | Completed);

const steps: `${keyof Completed}`[] = ["1", "2", "3", "4", "5", "6", "7"];
// typeguard LaunchState is a Completed
export const isCompleted = (state: LaunchState): state is Meta & Completed => {
  const completed = Object.keys(state);
  return (
    state.progress === 8 && steps.every((step) => completed.includes(step))
  );
};
