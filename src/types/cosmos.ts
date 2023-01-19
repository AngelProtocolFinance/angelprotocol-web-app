import type { Pubkey } from "@cosmjs/amino";

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
      pub_key: Pubkey;
      signature: string; // lrunrkF69b...jWFgEA==
    }
  ];
};
