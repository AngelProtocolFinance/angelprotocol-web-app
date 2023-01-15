import { TokenWithBalance } from "services/types";

export type TokenWithAmount = TokenWithBalance & { amount: string };
