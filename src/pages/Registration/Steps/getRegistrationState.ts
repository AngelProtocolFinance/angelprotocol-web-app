import {
  type InitStep,
  type Reg,
  isDone,
} from "@better-giving/registration/step";
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

  if (isDone.org(reg)) {
    return {
      state: { step: 2, data: toData(reg) },
      nextStep: steps.fsaInquiry,
    };
  }

  if (isDone.contact(reg)) {
    return {
      state: { step: 1, data: toData(reg) },
      nextStep: steps.orgDetails,
    };
  }

  return { state: { step: 1, data: toData(reg) }, nextStep: steps.orgDetails };
}

function toData<T extends Reg>({
  id,
  registrant_id,
  created_at,
  update_type,
  updated_at,
  env,
  claim,
  status,
  ...rest
}: T): { init: InitStep } & Omit<T, keyof InitStep> {
  return {
    init: {
      id,
      registrant_id,
      created_at,
      update_type,
      updated_at,
      env,
      claim,
      status,
    },
    ...rest,
  };
}
