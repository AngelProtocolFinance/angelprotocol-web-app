import {
  https_url,
  reg_number,
  slug,
  social_media_urls,
  str,
} from "@better-giving/endowment/schema";
import { orgDesignation } from "@better-giving/schemas";
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
  maxSize: 4e6,
};
export const cardImgSpec: ImgSpec = {
  type: VALID_MIME_TYPES,
  aspect: [2, 1],
  maxSize: 4e6,
};
export const bannerSpec: ImgSpec = {
  type: VALID_MIME_TYPES,
  aspect: [4, 1],
  maxSize: 4e6,
};

const requiredStr = v.pipe(str, v.nonEmpty("required"));

export const schema = v.object({
  slug,
  registration_number: reg_number,
  name: requiredStr,
  endow_designation: orgDesignation,
  overview: richTextContent({ maxChars: MAX_CHARS, required: true }),
  tagline: v.pipe(requiredStr, v.maxLength(140, "max length is 140 chars")),
  image: imgOutput({ required: true }),
  logo: imgOutput({ required: true }),
  card_img: imgOutput({ required: true }),
  hq_country: requiredStr,
  active_in_countries: v.array(str),
  street_address: v.optional(str),
  social_media_urls: social_media_urls,
  url: v.optional(https_url(false)),
  sdgs: v.pipe(v.array(str), v.minLength(1, "required")),
  published: v.boolean(),
});

export type FV = v.InferInput<typeof schema>;
