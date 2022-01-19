export type Token = {
  contract_addr: string;
};
export type NativeToken = {
  denom: string;
};
export interface WeightedAssetInfo<T> {
  info: T extends Token ? { token: T } : { native_token: T };
  start_weight: string; //"96"
  end_weight: string; //"50"
}

export interface WeightedPoolAssetInfo<T> extends WeightedAssetInfo<T> {
  amount: string; //for simul and pool result
}

export type PairInfo = {
  asset_infos: [WeightedAssetInfo<Token>, WeightedAssetInfo<NativeToken>];
  token_code_id: number;
  start_time: number;
  end_time: number;
  description?: string;
  commission_rate: string; //""0.02""
};

export type Simulation = {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
  is_placeholder?: true;
};

export type Pool = {
  assets: [WeightedPoolAssetInfo<Token>, WeightedPoolAssetInfo<NativeToken>];
  total_share: string;
};

export type PoolBalance = {
  native_token: string;
  token: string;
  is_placeholder?: true;
};
