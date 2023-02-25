import { AccountType } from "@giving/types/contracts";

export const accountTypeDisplayValue: { [key in AccountType]: string } = {
  locked: "endowment",
  liquid: "current",
};
