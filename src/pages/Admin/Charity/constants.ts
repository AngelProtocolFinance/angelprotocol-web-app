import { AccountType } from "types/contracts";

export const accountTypeDisplayValue: { [key in AccountType]: string } = {
  locked: "endowment",
  liquid: "current",
};
