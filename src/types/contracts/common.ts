import { Coin } from "@cosmjs/proto-signing";
import { UNSDG_NUMS } from "types/lists";

export type EmbeddedWasmMsg = {
  wasm: {
    execute: {
      contract_addr: string;
      funds: Coin[];
      msg: string; //base64 endocoded msg object
    };
  };
};

export type EmbeddedBankMsg = {
  bank: {
    send: {
      amount: Coin[];
      to_address: string;
    };
  };
};

export type Vote = "yes" | "no";

export enum EndowmentStatus {
  Inactive,
  Approved,
  Frozen,
  Closed,
}

export type EndowmentStatusText = Lowercase<keyof typeof EndowmentStatus>;
export type EndowmentTierNum = 1 | 2 | 3;

export type Categories = {
  sdgs: UNSDG_NUMS[]; // u8 maps one of the 17 UN SDG
  general: number[]; //??
};

export type Asset = {
  info: { native: string } | { cw20: string };
  amount: string;
};
