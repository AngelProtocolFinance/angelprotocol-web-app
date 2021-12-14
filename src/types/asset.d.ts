interface Coin {
  amount: string;
  denom: string;
}

interface Asset {
  amount: string;
  symbol: string;
}

/* chain */
interface AssetInfo {
  token: { contract_addr: string };
}

interface NativeInfo {
  native_token: { denom: string };
}

interface AssetToken {
  amount: string;
  info: AssetInfo;
}

interface NativeToken {
  amount: string;
  info: NativeInfo;
}

interface Token {
  amount: string;
  info: AssetInfo | NativeInfo;
}
