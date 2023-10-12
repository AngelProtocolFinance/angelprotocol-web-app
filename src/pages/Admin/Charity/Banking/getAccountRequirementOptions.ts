import { AccountRequirements } from "./types";

export default async function getAccountRequirementOptions(
  targetCurrency: string
): Promise<AccountRequirements[]> {
  return fetch(
    `https://api.sandbox.transferwise.tech/v1/account-requirements?source=USD&target=${targetCurrency}&sourceAmount=1000000`
  ).then<AccountRequirements[]>((res) => res.json());
}
