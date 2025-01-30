import type { TokenWithDetails } from "types/components";

type Classes = {
  container?: string;
  label?: string;
  input?: string;
};

export type Props = {
  token: TokenWithDetails;
  error?: string;
  onChange: (token: TokenWithDetails) => void;
  label: string;
  classes?: Classes;
  disabled?: boolean;

  withBalance?: true;
  withMininum?: true;
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
