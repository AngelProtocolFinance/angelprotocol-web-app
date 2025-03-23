import { unmask } from "../dollar-mask";
import { type State, methodsArr } from "../types";

const typeWeights: { [key: string]: number } = {
  "credit-card": 0.63,
  ach: 0.1,
  "digital-wallets": 0.07,
  daf: 0.12,
  stocks: 0.06,
  crypto: 0.02,
};

// Define a reusable type for growth projections
export interface Projection {
  savings: number;
  sustainability: number;
  combined: number;
}

const compound = (annual: number, rate: number, years: number): number => {
  const dailyRate = rate / 365;
  const daysPerYear = 365;
  let total = 0;
  for (let year = 0; year < years; year++) {
    total += annual;
    for (let day = 0; day < daysPerYear; day++) {
      total *= 1 + dailyRate;
    }
  }
  return total;
};

const projectFn = (savAmt: number, susAmt: number) => {
  return (yrs: number): Projection => {
    const totalSav = compound(savAmt, 0.04, yrs);
    const totalSus = compound(susAmt, 0.2, yrs);

    const savGrowth = totalSav - savAmt * yrs;
    const susGrowth = totalSus - susAmt * yrs;

    return {
      savings: savGrowth,
      sustainability: susGrowth,
      combined: savGrowth + susGrowth,
    };
  };
};

export interface View {
  amount: number;
  bgNet: number;
  ogNet: number;
  ogFees: number;
  diff: number;
  ogMissed: number;
  y1: Projection;
  y3: Projection;
  y5: Projection;
  y10: Projection;
  y15: Projection;
  y20: Projection;
}

const donorCoverageReduction = 0.8;

export function bgView(og: State): View {
  // Parse and normalize inputs
  const amnt = unmask(og.annualAmount);
  const subscriptionCost = unmask(og.annualSubscriptionCost);
  // Better Giving constants

  // Calculate current amount received
  const ogProcessingFee =
    og.averageProcessingFee *
    (og.donorCanCoverProcessingFees ? 1 - donorCoverageReduction : 1);

  const ogNet =
    amnt - subscriptionCost - amnt * (ogProcessingFee + og.platformFees);

  // Identify missing donation types
  const ogDonTypes = new Set(og.donationTypes);
  const ogMissedDonTypes = methodsArr.filter((type) => !ogDonTypes.has(type));
  const ogMissedRate = ogMissedDonTypes.reduce(
    (sum, type) => sum + (typeWeights[type] || 0),
    0
  );

  const ogMissed = amnt * (ogMissedRate * 0.5); //drop-off factor of 0.5
  const bgRate = 0.02 * (1 - donorCoverageReduction);

  const bgNet = amnt - amnt * bgRate + ogMissed;
  const diff = bgNet - ogNet;

  const notGranted = bgNet * og.donationsToSavings;
  const savings = notGranted * (1 - og.savingsInvested);
  const invested = notGranted * og.savingsInvested;

  // Create a specialized projection calculator for our specific yields
  const project = projectFn(savings, invested);

  return {
    amount: amnt,
    ogNet,
    bgNet,
    ogFees: amnt - ogNet,
    ogMissed,
    diff,
    //projections
    y1: project(1),
    y3: project(3),
    y5: project(5),
    y10: project(10),
    y15: project(15),
    y20: project(20),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
