import type { Progress } from "@better-giving/reg";

export const steps = {
  contact: "1",
  org_details: "2",
  fsa_inq: "3",
  docs: "4",
  banking: "5",
  summary: "6",
};

export const next_step: { [K in Progress["step"]]: string } = {
  1: steps.org_details,
  2: steps.fsa_inq,
  3: steps.docs,
  4: steps.banking,
  5: steps.summary,
  6: steps.summary,
};

export enum routes {
  index = "",
  resume = "resume",
  success = "success",
  welcome = "welcome",
  sign_notice = "sign-notice",
  sign_result = "sign-result",
}
