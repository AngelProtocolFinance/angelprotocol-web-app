export type VaultRateInfo = {
  vault_addr: string; //"terra172u..
  fx_rate: string; //"1.206784043460040765"
};

export type VaultsRateRes = {
  vaults_rate: VaultRateInfo[];
};
