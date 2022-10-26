import { Token } from "types/aws";

export type TokenWithAmount = Token & { amount: string };

export interface DonateValues {
  token: TokenWithAmount;
  liquidSplit: string;
}
