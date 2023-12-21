import { WiseCurrency } from "types/aws";

export type Currency = Pick<WiseCurrency, "code" | "name">;
