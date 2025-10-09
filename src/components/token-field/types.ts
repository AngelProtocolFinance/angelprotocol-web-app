import type { TokenWithDetails } from "types/components";

type Classes = {
  container?: string;
  label?: string;
  input?: string;
};

export type Props = {
  token: TokenWithDetails;
  error?: string;
  on_change: (token: TokenWithDetails) => void;
  label: string;
  classes?: Classes;
  disabled?: boolean;

  with_bal?: true;
  with_min?: true;
};

export namespace Token {
  export type State = "loading" | "error" | "ok";
  export namespace Event {
    export interface Detail {
      state: State;
    }
    export type Name = "crypto-token-event";
  }
}
