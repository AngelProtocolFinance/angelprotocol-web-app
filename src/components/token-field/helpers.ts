import { number } from "yup";
export const multipliable = (amount: string) =>
  number().min(0).isValidSync(amount) ? +amount : 0;
