import {
  type InitStep,
  type Reg,
  isDone,
} from "@better-giving/registration/step";
import type { RegistrationState } from "../types";

export function getRegistrationState(reg: Reg): RegistrationState {
  if (isDone.submission(reg)) {
    return { step: 6, data: toData(reg) };
  }

  if (isDone.banking(reg)) {
    return { step: 5, data: toData(reg) };
  }

  if (isDone.docs(reg)) {
    return { step: 4, data: toData(reg) };
  }

  if (isDone.fsaInq(reg)) {
    return { step: 3, data: toData(reg) };
  }

  if (isDone.org(reg)) {
    return { step: 2, data: toData(reg) };
  }

  if (isDone.contact(reg)) {
    return { step: 1, data: toData(reg) };
  }

  return { step: 1, data: toData(reg) };
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
