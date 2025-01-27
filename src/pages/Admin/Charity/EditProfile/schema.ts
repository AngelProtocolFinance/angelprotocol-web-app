import {
  endowDesignation,
  maybeEmptyHttpsUrl,
  reg_number,
  slug,
  social_media_urls,
  str,
  unSdgNum,
} from "@better-giving/endowment/schema";
import { type ImgSpec, imgOutput } from "components/img-editor";
import { richTextContent } from "types/components";
import type { ImageMIMEType } from "types/lists";
import * as v from "valibot";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const MAX_CHARS = 4000;

export const logoSpec: ImgSpec = {
  type: VALID_MIME_TYPES,
  aspect: [1, 1],
  maxSize: 1e6,
};
export const cardImgSpec: ImgSpec = {
  type: VALID_MIME_TYPES,
  aspect: [2, 1],
  maxSize: 1e6,
};
export const bannerSpec: ImgSpec = {
  type: VALID_MIME_TYPES,
  aspect: [4, 1],
  maxSize: 1e6,
};

const requiredStr = v.pipe(str, v.nonEmpty("required"));

/** not set by user */
const country = v.object({
  name: requiredStr,
  code: requiredStr,
  flag: str,
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
  overview: richTextContent({ maxChars: MAX_CHARS, required: true }),
  tagline: v.pipe(requiredStr, v.maxLength(140, "max length is 140 chars")),
  image: imgOutput({ required: true }),
  logo: imgOutput({ required: true }),
  card_img: imgOutput({ required: true }),
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
