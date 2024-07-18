import type { TokenWithAmount } from "types/tx";

export type OnTokenChange = (token: TokenWithAmount) => void;
