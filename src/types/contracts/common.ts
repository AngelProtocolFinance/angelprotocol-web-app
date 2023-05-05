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

export type EndowmentStatus = {
  inactive: 0;
  approved: 1;
  frozen: 2;
  closed: 3;
};

export type EndowmentType = "charity" | "normal"; //TODO: move to types/lists
export type EndowmentStatusText = keyof EndowmentStatus;
export type EndowmentStatusNum = EndowmentStatus[EndowmentStatusText];
export type EndowmentStatusStrNum = `${EndowmentStatusNum}`;
export type EndowmentTierNum = 1 | 2 | 3;

export type Categories = {
  sdgs: UNSDG_NUMS[]; // u8 maps one of the 17 UN SDG
  general: number[]; //??
};

export type Asset = {
  info: { native: string } | { cw20: string };
  amount: string;
};
