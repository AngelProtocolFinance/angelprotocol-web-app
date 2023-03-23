import { TokenWithBalance } from "./aws";

export type TokenWithAmount = TokenWithBalance & { amount: string };
