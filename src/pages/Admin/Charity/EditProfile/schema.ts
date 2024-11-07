import {
  endowDesignation,
  maybeEmptyHttpsUrl,
  reg_number,
  slug,
  social_media_urls,
  str,
  unSdgNum,
} from "@better-giving/endowment/schema";
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

const requiredStr = v.pipe(str, v.nonEmpty("required"));

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

const sdgs = v.array(
  v.object({
    label: requiredStr,
    value: unSdgNum,
  })
);

export const schema = v.object({
  slug,
  registration_number: reg_number,
  name: requiredStr,
  endow_designation: v.object({
    label: str,
    value: endowDesignation,
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
  social_media_urls: social_media_urls,
  url: v.optional(maybeEmptyHttpsUrl),
  sdgs: v.pipe(sdgs, v.minLength(1, "required")),
  published: v.boolean(),
});

export type FV = v.InferInput<typeof schema>;
