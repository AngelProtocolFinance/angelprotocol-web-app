import { Keplr } from "@keplr-wallet/types";

type AminoSignRes = Awaited<ReturnType<Keplr["signAmino"]>>;
type Signed = AminoSignRes["signed"];
type Signature = AminoSignRes["signature"];
export type ADR36Payload = Pick<Signed, "fee" | "memo"> & {
  msg: Signed["msgs"];
  signatures: Signature[];
};
