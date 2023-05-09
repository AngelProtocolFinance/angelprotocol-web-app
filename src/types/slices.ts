import { TokenWithBalance as TWB } from "types/tx";

const _type: keyof TWB = "type";

export type TokenWithAmount = Omit<TWB, typeof _type> & {
  amount: string;
  type: TWB["type"] | "fiat"; // "fiat" & "gift" type not present in AWS (added here)
};
