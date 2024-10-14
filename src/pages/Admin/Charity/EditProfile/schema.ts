import type { ImageMIMEType } from "types/lists";
import * as v from "valibot";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const MAX_SIZE_IN_BYTES = 1e6;
export const MAX_CHARS = 4000;

const str = v.pipe(v.string(), v.trim());
const requiredStr = v.pipe(str, v.nonEmpty("required"));

const url = v.lazy((x) => {
  if (!x) return str;
  return v.pipe(
    str,
    v.startsWith("https://", "should start with https://"),
    v.custom((x) => x !== "https://", "incomplete url"),
    v.url("invalid url")
  );
});

/** not set by user */
const fileObject = v.object({
  name: str,
  publicUrl: str,
});

/** not set by user */
const country = v.object({
  name: requiredStr,
  code: requiredStr,
  flag: str,
});

export const imgLink = v.object({
  file: v.optional(
    v.pipe(
      v.file("invalid file"),
      v.mimeType(VALID_MIME_TYPES, "invalid type"),
      v.maxSize(MAX_SIZE_IN_BYTES, "exceeds size limit")
    )
  ),
  /** not set by user */
  preview: str,
  ...fileObject.entries,
});

const designations = [
  "",
  "Charity",
  "Religious Organization",
  "University",
  "Hospital",
  "Other",
] as const;

const sdgs = v.array(
  v.object({
    label: requiredStr,
    value: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(17)),
  })
);

const segment = v.lazy((x) => {
  if (!x) return str;
  return v.pipe(
    str,
    v.maxLength(30, "max 30 characters"),
    //must not be id-like
    v.regex(/^(?!^\d+$)/, "should not be an id"),
    //valid characters
    v.regex(/^[a-zA-Z0-9-._~]+$/, "allowed: numbers | letters | - | . | _ | ~"),
    v.excludes("..", "should not contain double periods"),
    v.custom(
      (x) => !(x as string).startsWith("."),
      "should not start with dot"
    ),
    v.custom((x) => !(x as string).endsWith("."), "should not end with dot")
  );
});

export const schema = v.object({
  slug: segment,
  registration_number: v.pipe(
    requiredStr,
    v.regex(/^[a-zA-Z0-9]+$/, "must only contain numbers and letters")
  ),
  name: requiredStr,
  endow_designation: v.object({
    label: str,
    value: v.picklist(designations),
  }),
  overview: v.object({
    value: requiredStr,
    length: v.optional(
      v.pipe(
        v.number(),
        v.maxValue(MAX_CHARS, (x) => `max ${x.requirement} characters`)
      )
    ),
  }),
  tagline: v.pipe(requiredStr, v.maxLength(140, "max length is 140 chars")),
  image: imgLink,
  logo: imgLink,
  card_img: imgLink,
  hq_country: country,
  active_in_countries: v.array(
    v.object({ label: requiredStr, value: requiredStr })
  ),
  street_address: v.optional(str),
  social_media_urls: v.object({
    facebook: v.optional(url),
    twitter: v.optional(url),
    linkedin: v.optional(url),
    discord: v.optional(url),
    instagram: v.optional(url),
    youtube: v.optional(url),
    tiktok: v.optional(url),
  }),
  url: v.optional(url),
  sdgs: v.pipe(sdgs, v.minLength(1, "required")),
  published: v.boolean(),
});

export type FV = v.InferInput<typeof schema>;
