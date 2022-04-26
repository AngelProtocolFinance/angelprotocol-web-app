import { SupportedDenoms } from "@types-component/donater";

export const decimals: {
  [key in SupportedDenoms]: number;
} = {
  uusd: 2,
  ether: 6,
  uluna: 6,
  bnb: 6,
};
