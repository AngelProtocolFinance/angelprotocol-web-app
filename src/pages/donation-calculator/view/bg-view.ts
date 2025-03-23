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
  bgNet: number;
  ogNet: number;
  ogFees: number;
  diff: number;
  ogMissed: number;
  projection: Growth[];
}

const donorCoverageReduction = 0.8;

export function bgView(og: State): View {
  const amnt = unmask(og.annualAmount);
  const subscriptionCost = unmask(og.annualSubscriptionCost);

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

  return {
    amount: amnt,
    notGranted,
    notGrantedRate: og.donationsToSavings,
    ogNet,
    bgNet,
    ogFees: amnt - ogNet,
    ogMissed,
    diff,
    projection: project(savings, invested, 20),
  };
}
