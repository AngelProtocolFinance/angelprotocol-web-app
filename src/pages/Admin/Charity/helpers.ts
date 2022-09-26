import { AccountType } from "types/contracts";

export function getAccounType(typeParam?: string): AccountType {
  const locked: AccountType = "locked";
  const liquid: AccountType = "liquid";
  return typeParam === locked ? locked : liquid;
}
