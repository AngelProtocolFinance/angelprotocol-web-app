import type { RegStep } from "./types";

export const steps = {
  contact: "1",
  orgDetails: "2",
  fsaInquiry: "3",
  docs: "4",
  banking: "5",
  summary: "6",
};

export const nextStep: { [K in RegStep]: string } = {
  1: steps.contact,
  2: steps.orgDetails,
  3: steps.docs,
  4: steps.banking,
  5: steps.summary,
  6: steps.summary,
};
