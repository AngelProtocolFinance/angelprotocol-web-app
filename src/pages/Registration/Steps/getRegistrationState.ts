import type { Init } from "@better-giving/registration/models";
import { type Reg, isDone } from "@better-giving/registration/step";
import { steps } from "../routes";
import type { RegistrationState } from "../types";

export function getRegistrationState(reg: Reg): {
  state: RegistrationState;
  nextStep: steps;
} {
  if (isDone.submission(reg)) {
    return { state: { step: 6, data: toData(reg) }, nextStep: steps.summary };
  }

  if (isDone.banking(reg)) {
    return { state: { step: 5, data: toData(reg) }, nextStep: steps.summary };
  }

  if (isDone.docs(reg)) {
    return { state: { step: 4, data: toData(reg) }, nextStep: steps.banking };
  }

  if (isDone.fsaInq(reg)) {
    return { state: { step: 3, data: toData(reg) }, nextStep: steps.docs };
  }

  if (isDone.contact(reg)) {
    return {
      state: { step: 2, data: toData(reg) },
      nextStep: steps.orgDetails,
    };
  }

  return { state: { step: 1, data: toData(reg) }, nextStep: steps.contact };
}

function toData<T extends Reg>({
  id,
  registrant_id,
  created_at,
  env,
  claim,
  status,
  ...rest
}: T): { init: Init } & Omit<T, keyof Init> {
  return {
    init: {
      id,
      registrant_id,
      created_at,
      env,
      claim,
      status,
    },
    ...rest,
  };
}
