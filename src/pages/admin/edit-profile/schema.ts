import {
  $,
  $req,
  https_url,
  org_designation,
  reg_number,
  slug,
  social_media_urls,
} from "@better-giving/endowment/schema";
import { type ImgSpec, img_output } from "components/img-editor";
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
  max_size: 4e6,
};
export const cardImgSpec: ImgSpec = {
  type: VALID_MIME_TYPES,
  aspect: [2, 1],
  max_size: 4e6,
};
export const bannerSpec: ImgSpec = {
  type: VALID_MIME_TYPES,
  aspect: [4, 1],
  max_size: 4e6,
};

export const schema = v.object({
  slug,
  registration_number: reg_number,
  name: $req,
  endow_designation: org_designation,
  overview: richTextContent({ maxChars: MAX_CHARS, required: true }),
  tagline: v.pipe($req, v.maxLength(140, "max length is 140 chars")),
  image: img_output({ required: true }),
  logo: img_output({ required: true }),
  card_img: img_output({ required: true }),
  hq_country: $req,
  active_in_countries: v.array($),
  street_address: v.optional($),
  social_media_urls: social_media_urls,
  url: v.optional(https_url()),
  sdgs: v.pipe(v.array($), v.minLength(1, "required")),
  published: v.boolean(),
});

export type FV = v.InferInput<typeof schema>;
