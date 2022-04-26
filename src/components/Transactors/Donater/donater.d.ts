declare module "@types-component/donater" {
  import { Denoms } from "@types-lists";
  import { FC } from "react";

  type SupportedDenoms = Extract<Denoms, "uusd" | "ether" | "uluna" | "bnb">;

  interface DonateValues {
    amount: string;
    split_liq: string;
    //metadata;
    currency: SupportedDenoms;
    min_liq: number;
    max_liq: number;
    to: "tca" | "fund" | "charity";
    receiver?: number | string;
  }

  interface FromTCA {
    to: "tca";
    receiver?: never;
    max_liq?: never;
    min_liq?: never;
  }

  interface ToFund {
    to: "fund";
    receiver?: number;
    max_liq?: number;
    min_liq?: number;
  }

  interface ToCharity {
    to: "charity";
    receiver: string;
    //doesn't know yet limits on charity donations
    max_liq?: number;
    min_liq?: number;
  }

  type FundFlow = ToFund | ToCharity | FromTCA;
  type Props = FundFlow & { Form: FC };
}
