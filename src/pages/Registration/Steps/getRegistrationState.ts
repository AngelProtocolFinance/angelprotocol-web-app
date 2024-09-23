import { type RegV2, isDone } from "types/aws";
import { steps } from "../routes";
import type { RegistrationState } from "../types";

export function getRegistrationState(reg: RegV2.Record): {
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
      nextStep: steps.fsaInquiry,
    };
  }

  return { state: { step: 1, data: toData(reg) }, nextStep: steps.contact };
}

function toData<T extends RegV2.Record>({
  id,
  registrant_id,
  hubspot_contact_id,
  created_at,
  env,
  claim,
  ...rest
}: T): { init: RegV2.Init } & Omit<T, keyof RegV2.Init> {
  return {
    init: { id, registrant_id, hubspot_contact_id, created_at, env, claim },
    ...rest,
  };
}
