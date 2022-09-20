import { AccountType } from "types/contracts";

export type OnVaultSelect = (addr: string) => void;
export type VaultsProps = {
  type: AccountType;
  preSelected: string[];
  onSelect: OnVaultSelect;
};

export type VaultProps = {
  address: string;
  isSelected: boolean;
  isPreselected: boolean;
  handleVaultSelect(): void;
};
