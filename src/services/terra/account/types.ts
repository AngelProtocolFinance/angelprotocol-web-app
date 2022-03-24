export type Holding = { address: string; amount: string };
export interface Holdings {
  locked_native: Holding[];
  locked_cw20: Holding[];
  liquid_native: Holding[];
  liquid_cw20: Holding[];
  is_placeholder?: true;
}

export interface EndowmentDetails {
  owner: string; //"cw3 owner";
  name: string;
  //..update attr on demand

  isPlaceHolder?: true;
}
