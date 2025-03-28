import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";

export interface State {
  annualAmount: string;
  averageProcessingFeePct: number;
  platformFeesPct: number;
  annualSubscriptionCost: string;
  donorCanCoverProcessingFees: boolean;
  /** credit-card, ach, digital-wallets, crypto, stocks, daf */
  donationTypes: string[];

  donationsToSavingsPct: number;
  savingsInvestedPct: number;
}

type Ctx = [State, Dispatch<SetStateAction<State>>];

export const context = createContext<Ctx>(undefined as any);

export const useCtx = (): Ctx => {
  return useContext(context);
};
