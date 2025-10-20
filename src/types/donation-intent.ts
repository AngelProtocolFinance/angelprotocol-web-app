import {
  donation_source,
  donor_title,
  frequency,
} from "@better-giving/donation/schema";
import { $int_gte1, $req } from "@better-giving/schemas";

export {
  donation_source,
  donor_titles,
  type TFrequency,
  frequency,
} from "@better-giving/donation/schema";

import * as v from "valibot";

export const str = v.pipe(v.string(), v.trim());

export const donor_address = v.object({
  street: $req,
  city: $req,
  state: v.optional($req),
  zip_code: $req,
  /** country name */
  country: $req,
  uk_gift_aid: v.optional(v.boolean()),
});

export type DonorAddress = v.InferOutput<typeof donor_address>;

export const donor_public_msg_max_length = 500;
export const donor_public_msg = v.pipe(
  $req,
  v.maxLength(
    donor_public_msg_max_length,
    (x) => `max ${x.requirement} characters`
  )
);
export const donor_msg_to_npo_max_length = 500;
export const donor_msg_to_npo = v.pipe(
  $req,
  v.maxLength(
    donor_msg_to_npo_max_length,
    (x) => `max ${x.requirement} characters`
  )
);
export const donor = v.object({
  title: donor_title,
  first_name: v.pipe(str, v.nonEmpty("Please enter your first name")),
  company_name: v.optional(str),
  last_name: v.pipe(str, v.nonEmpty("Please enter your last name")),
  email: v.pipe(
    str,
    v.nonEmpty("Please enter your email"),
    v.email("Please check your email for correctness")
  ),
  address: v.optional(donor_address),
  public_msg: v.optional(donor_public_msg),
  msg_to_npo: v.optional(donor_msg_to_npo),
  is_public: v.optional(v.boolean()),
});

export type Donor = v.InferOutput<typeof donor>;

const money = v.pipe(v.number(), v.minValue(0));

export const amount = v.object({
  amount: money,
  currency: v.pipe($req, v.toUpperCase()),
  tip: money,
  fee_allowance: money,
});

export type Amount = v.InferOutput<typeof amount>;

export const uuid = v.pipe(str, v.uuid());

export const program = v.object({
  id: uuid,
  name: $req,
});

export type Program = v.InferOutput<typeof program>;

export const recipient = v.union([$int_gte1, uuid]);

export type Recipient = v.InferOutput<typeof recipient>;

export const from_msg_max_length = 250;
export const tribute_notif = v.object({
  to_email: v.pipe($req, v.email("invalid email")),
  to_fullname: $req,
  from_msg: v.pipe(
    str,
    v.maxLength(from_msg_max_length, (x) => `max ${x.requirement} characters`)
  ),
});

export type TributeNotif = v.InferOutput<typeof tribute_notif>;

export const tribute = v.object({
  full_name: $req,
  notif: v.optional(tribute_notif),
});

export type Tribute = v.InferOutput<typeof tribute>;

export const intent = v.object({
  amount,
  recipient,
  program: v.optional(program),
  donor,

  source: donation_source,
  tribute: v.optional(tribute),
  frequency,
  /** chain name, etc. */
  via_name: str,
  /** chain id, workflow-session-id, etc. */
  via_id: str,
});

export type DonationIntent = v.InferOutput<typeof intent>;
