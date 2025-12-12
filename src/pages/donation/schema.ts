import {
  donor_msg_to_npo,
  donor_public_msg,
  tribute,
} from "lib/donations/schema";
import * as v from "valibot";
export const tribute_fv = v.object({
  type: v.literal("tribute"),
  ...tribute.entries,
});

export const public_msg_fv = v.object({
  type: v.literal("public_msg"),
  msg: donor_public_msg,
});
export interface IPublicMsgFv extends v.InferOutput<typeof public_msg_fv> {}

export const private_msg_fv = v.object({
  type: v.literal("private_msg"),
  msg: donor_msg_to_npo,
});

export interface IPrivateMsgFv extends v.InferOutput<typeof private_msg_fv> {}

export const schema = v.variant("type", [
  tribute_fv,
  private_msg_fv,
  public_msg_fv,
]);

export interface TributeFv extends v.InferOutput<typeof tribute_fv> {}
export type Schema = v.InferOutput<typeof schema>;
