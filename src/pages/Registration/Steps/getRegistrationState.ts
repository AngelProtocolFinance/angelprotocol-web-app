import { type RegV2, isDone } from "types/aws";
import { steps } from "../routes";
import type { RegistrationState } from "../types";

export function getRegistrationState(reg: RegV2.Record): {
  state: RegistrationState;
  nextStep: steps;
} {
  if (isDone.step6(reg)) {
    return { state: { step: 6, data: reg }, nextStep: steps.summary };
  }

  if (isDone.step5(reg)) {
    return { state: { step: 5, data: reg }, nextStep: steps.summary };
  }

  if (isDone.step4(reg)) {
    return { state: { step: 4, data: reg }, nextStep: steps.banking };
  }

  if (isDone.step3(reg)) {
    return { state: { step: 3, data: reg }, nextStep: steps.docs };
  }

  if (isDone.step2(reg)) {
    return { state: { step: 2, data: reg }, nextStep: steps.fsaInquiry };
  }

  return {
    state: { step: 1, data: reg satisfies RegV2.Step1 },
    nextStep: steps.contact,
  };
}
