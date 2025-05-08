export interface Growth {
  liq: number;
  lock: number;
  total: number;
  end: Omit<Growth, "end">;
}

export interface View {
  amount: number;
  ogMissedFromDonTypes: number;
  ogProcessingFeeRate: number;
  ogPlatformFeeRate: number;
  ogSubsCost: number;
  ogFees: number;
  ogDeductions: number;
  ogNet: number;
  /** credit-card, ach, digital-wallets, crypto, stocks, daf */
  ogDonMethods: string[];

  bgFees: number;
  bgNet: number;

  feeSavings: number;
  advantage: number;

  notGranted: number;
  notGrantedRate: number;
  savingsRate: number;
  savings: number;
  investedRate: number;
  invested: number;

  projection: Growth[];
}
