import { summaryData } from "../common/constants";
import type { DonationDetails, DonationState } from "../types";

const tokenId = (details: DonationDetails) => {
  switch (details.method) {
    case "crypto":
      return details.token.id;
    case "stocks":
      return details.symbol;
    default:
      return details.currency.code;
  }
};

export const nextFormState = (
  prev: DonationState,
  details: DonationDetails
): DonationState => {
  //reset tip when form changes tokenId
  const newTip = (() => {
    if (!("tip" in prev)) return;
    if (tokenId(prev.details) !== tokenId(details)) return;
    return prev.tip;
  })();

  const toPersist: DonationState =
    prev.details?.method === details.method
      ? { ...prev, ...("tip" in prev ? { tip: newTip } : {}) }
      : //reset if of different method
        { init: prev.init, step: "donate-form" };

  if (prev.init.config?.splitDisabled) {
    if (prev.init.recipient.hide_bg_tip) {
      // donor info is retrieved from donor's DAF account
      if (details?.method === "daf") {
        return {
          ...toPersist,
          ...summaryData(prev),
          details,
          step: "submit",
          liquidSplitPct: prev.init.config.liquidSplitPct,
        };
      }

      return {
        ...toPersist,
        details,
        step: "summary",
        liquidSplitPct: prev.init.config.liquidSplitPct,
      };
    }

    return {
      ...toPersist,
      details,
      step: "tip",
      liquidSplitPct: prev.init.config.liquidSplitPct,
    };
  }

  return { ...toPersist, details, step: "splits" };
};
