import type { DonationDetails, DonationState } from "../types";

const tokenId = (details: DonationDetails) => {
  switch (details.method) {
    case "crypto":
      return details.token.token_id;
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
      ? //persist everything if of the same method
        { ...prev, ...("tip" in prev ? { tip: newTip } : {}) }
      : { init: prev.init, step: "donate-form" };

  if (prev.init.widgetConfig?.splitDisabled) {
    return {
      ...toPersist,
      details,
      //also skip tip if applicable
      step: prev.init.recipient.hide_bg_tip ? "summary" : "tip",
      liquidSplitPct: prev.init.widgetConfig.liquidSplitPct,
    };
  }
  return { ...toPersist, details, step: "splits" };
};
