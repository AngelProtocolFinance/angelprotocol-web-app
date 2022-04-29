type CW20TokenInfo = {
  logo: string;
  symbol: string;
  native_denom?: never;
  cw20_contract: string;
  testnet_cw20_contract: string; // "" - none
};

type NativeTokenInfo = {
  logo: string;
  symbol: string;
  native_denom: string;
  cw20_contract?: never;
  testnet_cw20_contract?: never;
};

export type TokenInfo = NativeTokenInfo | CW20TokenInfo;

export type TxDetails = {
  transactionId: string;
  transactionDate: string;
  chainId: string;
  amount: number;
  splitLiq: string;
  walletAddress: string;
  denomination: string;
};

export type TxDataPermissions = {
  consent_tax?: boolean;
  consent_marketing?: boolean;
};

export type Receiver =
  | {
      charityId: string;
      fundId?: never;
    }
  | { fundId: number; charityId?: never };

export type ReceiptPayload = {
  transactionId: string; // tx hash
  fullName: string; // "John Doe"
  email: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
  consent_tax: boolean;
  consent_marketing: boolean;
};

export type TxLogPayload = Receiver & TxDetails & TxDataPermissions;
