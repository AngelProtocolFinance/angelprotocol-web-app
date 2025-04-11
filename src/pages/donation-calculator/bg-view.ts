import { unmask } from "./dollar-mask";
import { type Growth, type State, type View, methodsArr } from "./types";

const typeWeights: { [key: string]: number } = {
  "credit-card": 0.63,
  ach: 0.1,
  "digital-wallets": 0.07,
  daf: 0.12,
  stocks: 0.06,
  crypto: 0.02,
};

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

const donorCoverageFactor = (enabled = true) =>
  enabled ? 1 - 0.8 /** 80% of donors choose to cover when able to */ : 1;

export function bgView(og: State): View {
  const amnt = unmask(og.annualAmount);
  const subscriptionCost = unmask(og.annualSubscriptionCost);

  //processing fee comparison
  const ogProcessingFee =
    amnt *
    og.processingFeeRate *
    donorCoverageFactor(og.donorCanCoverProcessingFees);
  const ogPlatformFee = amnt * og.platformFeeRate;
  const ogFees = ogProcessingFee + ogPlatformFee;

  /** bg processing rate is 2% and no platform fee  */
  const bgFees = amnt * 0.02 * donorCoverageFactor();

  const ogDonTypes = new Set(og.donationTypes);
  const ogMissedDonTypes = methodsArr.filter((type) => !ogDonTypes.has(type));
  const ogMissedRate = ogMissedDonTypes.reduce(
    (sum, type) => sum + (typeWeights[type] || 0),
    0
  );
  const ogMissedFromDonTypes = amnt * (ogMissedRate * 0.5); //drop-off factor of 0.5
  const ogDeductions = ogFees + subscriptionCost;
  const ogNet = amnt - ogDeductions;

  const feeSavings = ogFees - bgFees;

  const advantage = feeSavings + ogMissedFromDonTypes + subscriptionCost;
  const bgNet = amnt - bgFees + ogMissedFromDonTypes + subscriptionCost;

  const notGranted = bgNet * og.donationsToSavings;
  const investedRate = og.savingsInvested;
  const savingsRate = 1 - investedRate;
  const savings = notGranted * savingsRate;
  const invested = notGranted * og.savingsInvested;

  return {
    amount: amnt,
    ogPlatformFeeRate: og.platformFeeRate,
    ogProcessingFeeRate: og.processingFeeRate,
    ogMissedFromDonTypes,
    ogFees,
    ogSubsCost: subscriptionCost,
    ogDeductions,
    ogNet,
    bgFees,
    bgNet,
    feeSavings,
    advantage,
    notGranted,
    notGrantedRate: og.donationsToSavings,
    savings,
    savingsRate,
    invested,
    investedRate,
    projection: project(savings, invested, 20),
  };
}
