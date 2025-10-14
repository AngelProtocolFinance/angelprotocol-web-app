import type { ReactNode } from "react";

type Classes = {
  container?: string;
  label?: string;
  input?: string;
};

export interface ITokenField {
  label: string;
  amount: string;
  amount_usd: number;
  on_change: (v: string) => void;
  combobox?: ReactNode;
  min_amount?: ReactNode;
  error?: string;
  disabled?: boolean;
  classes?: Classes;
}

export type TTokenState = "loading" | "error" | undefined;
