import { unmask } from "./dollar-mask";
import { type State, methodsArr } from "./types";

const typeWeights: { [key: string]: number } = {
  "credit-card": 0.63,
  ach: 0.1,
  "digital-wallets": 0.07,
  daf: 0.12,
  stocks: 0.06,
  crypto: 0.02,
};

interface Growth {
  liq: number;
  lock: number;
  total: number;
  end: Omit<Growth, "end">;
}

const project = (savAmt: number, susAmt: number, yrs: number): Growth[] => {
  const savDailyRate = 0.04 / 365; // 4% annual rate
  const susDailyRate = 0.2 / 365; // 20% annual rate
  const daysPerYear = 365;
  const items: Growth[] = [];
  let savTotal = 0;
  let susTotal = 0;

  for (let year = 1; year <= yrs; year++) {
    // Add annual investments
    savTotal += savAmt;
    susTotal += susAmt;

    // Apply daily compounding for one year
    for (let day = 0; day < daysPerYear; day++) {
      savTotal *= 1 + savDailyRate;
      susTotal *= 1 + susDailyRate;
    }

    // Calculate growth by subtracting principal
    const savGrowth = savTotal - savAmt * year;
    const susGrowth = susTotal - susAmt * year;

    items.push({
      end: {
        liq: savTotal,
        lock: susTotal,
        total: savTotal + susTotal,
      },
      liq: savGrowth,
      lock: susGrowth,
      total: savGrowth + susGrowth,
    });
  }

  return items;
};

export interface View {
  amount: number;
  notGranted: number;
  notGrantedRate: number;
  ogMissedFromDonTypes: number;
  ogMissedFromDonorCoverage: number;
  ogSubsCost: number;
  ogFees: number;
  ogDeductions: number;
  ogNet: number;

  bgFees: number;
  bgNet: number;
  diff: number;
  // ogSubsCost: number;
  projection: Growth[];
}

const donorCoverageReduction = 0.8;
const bgProcessingRate = 0.02;

export function bgView(og: State): View {
  const amnt = unmask(og.annualAmount);
  const subscriptionCost = unmask(og.annualSubscriptionCost);

  //processing fee comparison
  const ogProcessingFee = amnt * og.processingFeeRate;
  const ogProcessingFeeDonorCovered =
    //when og is to use bg, the processing fee rate is 2%
    amnt *
    (Math.min(bgProcessingRate, og.processingFeeRate) *
      (1 - donorCoverageReduction));
  const ogMissedFromDonorCoverage = og.donorCanCoverProcessingFees
    ? 0
    : ogProcessingFee - ogProcessingFeeDonorCovered;

  const ogPlatformFee = amnt * og.platformFeeRate;
  const ogFees = ogProcessingFee + ogPlatformFee;

  /** bg processing rate is 2% and no platform fee  */
  const bgFees = amnt * bgProcessingRate;

  const ogDonTypes = new Set(og.donationTypes);
  const ogMissedDonTypes = methodsArr.filter((type) => !ogDonTypes.has(type));
  const ogMissedRate = ogMissedDonTypes.reduce(
    (sum, type) => sum + (typeWeights[type] || 0),
    0
  );
  const ogMissedFromDonTypes = amnt * (ogMissedRate * 0.5); //drop-off factor of 0.5

  const ogDeductions = ogFees + subscriptionCost;
  const ogNet = amnt - ogDeductions;

  const diff =
    ogFees - bgFees + ogMissedFromDonTypes + ogMissedFromDonorCoverage;

  const bgNet =
    amnt - bgFees + ogMissedFromDonTypes + ogMissedFromDonorCoverage;

  const notGranted = bgNet * og.donationsToSavings;
  const savings = notGranted * (1 - og.savingsInvested);
  const invested = notGranted * og.savingsInvested;

  return {
    amount: amnt,
    notGranted,
    notGrantedRate: og.donationsToSavings,
    ogMissedFromDonTypes,
    ogMissedFromDonorCoverage,
    ogFees,
    ogSubsCost: subscriptionCost,
    ogDeductions,
    ogNet,
    bgFees,
    bgNet,
    diff,
    projection: project(savings, invested, 20),
  };
}
