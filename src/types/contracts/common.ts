import type { PubKey } from "@cosmjs/launchpad";
import { Coin } from "@cosmjs/proto-signing";
import { UNSDG_NUMS } from "types/lists";

export interface ERC20Token {
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
  balance: string;
}

export interface QueryRes<T> {
  data: T;
}

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

export type CW4Member = {
  addr: string;
  weight: number;
};

type AbsolutePercentage = { absolute_percentage: { percentage: string } };
export type Threshold = AbsolutePercentage; // | AbsoluteCount | Quorum;

export type EndowmentStatus = {
  Inactive: 0;
  Approved: 1;
  Frozen: 2;
  Closed: 3;
};
export type EndowmentType = "charity" | "normal";
export type CapitalizedEndowmentType = Capitalize<EndowmentType>;
export type EndowmentStatusText = keyof EndowmentStatus;
export type EndowmentStatusNum = EndowmentStatus[EndowmentStatusText];
export type EndowmentStatusStrNum = `${EndowmentStatusNum}`;
export type EndowmentTier = "Level1" | "Level2" | "Level3";
export type EndowmentTierNum = 1 | 2 | 3;

export type Categories = {
  sdgs: UNSDG_NUMS[]; // u8 maps one of the 17 UN SDG
  general: number[]; //??
};

export type Asset = {
  info: { native: string } | { cw20: string };
  amount: string;
};

/**
 * ADR-36 requirements aren't fully specified for implementation
 * https://docs.keplr.app/api/#sign-amino
 */
export type ADR36SignDoc = {
  readonly msg: readonly [
    {
      readonly type: "sign/MsgSignData";
      readonly value: {
        signer: string; // wallet address
        data: string; // base64 string
      };
    }
  ];
  readonly fee: { gas: "0"; amount: [] };
  readonly memo: "";
  signatures: [
    {
      pub_key: PubKey;
      signature: string; // lrunrkF69b...jWFgEA==
    }
  ];
};
