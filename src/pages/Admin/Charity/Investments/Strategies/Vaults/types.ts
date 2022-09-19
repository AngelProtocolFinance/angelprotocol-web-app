import { UseFieldArrayAppend } from "react-hook-form";
import { StrategyFormValues } from "../Allocations/types";
import { AccountType } from "types/contracts";

export type OnVaultSelect = (addr: string) => void;
export type VaultsProps = {
  type: AccountType;
  selected: string[];
  onSelect: OnVaultSelect;
};

export type VaultProps = {
  address: string;
  isSelected: boolean;
  onSelect: OnVaultSelect;
};
