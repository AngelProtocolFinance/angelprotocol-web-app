import * as v from "valibot";

export const str = v.pipe(v.string(), v.trim());
export const required_str = v.pipe(str, v.nonEmpty("required"));

export const frequencies = ["one-time", "recurring"] as const;
export const frequency = v.picklist(
  frequencies,
  "Please select donation frequency"
);

export type Frequency = v.InferOutput<typeof frequency>;

export const donation_sources = [
  "bg-marketplace",
  "bg-widget",
  "tester-app",
] as const;

export const donation_source = v.picklist(donation_sources);
export type DonationSource = v.InferOutput<typeof donation_source>;

export const donor_titles = ["Mr", "Mrs", "Ms", "Mx", ""] as const;
export const donor_title = v.picklist(donor_titles);

export type DonorTitle = v.InferOutput<typeof donor_title>;

export const donor_address = v.object({
  street: required_str,
  city: required_str,
  state: v.optional(required_str),
  zip_code: required_str,
  /** country name */
  country: required_str,
  uk_gift_aid: v.optional(v.boolean()),
});

export type DonorAddress = v.InferOutput<typeof donor_address>;

export const donor_public_msg_max_length = 500;
export const donor_msg_to_npo_max_length = 500;
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
  public_msg: v.optional(
    v.pipe(
      required_str,
      v.maxLength(
        donor_public_msg_max_length,
        (x) => `max ${x.requirement} characters`
      )
    )
  ),
  msg_to_npo: v.optional(
    v.pipe(
      required_str,
      v.maxLength(
        donor_msg_to_npo_max_length,
        (x) => `max ${x.requirement} characters`
      )
    )
  ),
  is_public: v.optional(v.boolean()),
});

export type Donor = v.InferOutput<typeof donor>;

const money = v.pipe(v.number(), v.minValue(0));

export const amount = v.object({
  amount: money,
  currency: v.pipe(required_str, v.toUpperCase()),
  tip: money,
  fee_allowance: money,
});

export type Amount = v.InferOutput<typeof amount>;

export const endow_id = v.pipe(
  str,
  v.transform((x) => +x),
  v.number(),
  v.integer(),
  v.minValue(1)
);
export const uuid = v.pipe(str, v.uuid());

export const program = v.object({
  id: uuid,
  name: required_str,
});

export type Program = v.InferOutput<typeof program>;

export const recipient = v.union([endow_id, uuid]);

export type Recipient = v.InferOutput<typeof recipient>;

export const from_msg_max_length = 250;
export const tribute_notif = v.object({
  to_email: v.pipe(required_str, v.email("invalid email")),
  to_fullname: required_str,
  from_msg: v.pipe(
    str,
    v.maxLength(from_msg_max_length, (x) => `max ${x.requirement} characters`)
  ),
});

export type TributeNotif = v.InferOutput<typeof tribute_notif>;

export const tribute = v.object({
  full_name: required_str,
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
