import * as v from "valibot";
export type APIEnvironment = "staging" | "production";
/** Designates the parent component within which the given component is being rendered */
export type DonationSource = "bg-marketplace" | "bg-widget";

export type UNSDG_NUMS =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17;

export type SDGGroup = 1 | 2 | 3 | 4 | 5 | 6;

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
type ImageSubType = "svg+xml" | "jpeg" | "png" | "webp";
type ApplicationSubType = "pdf";

export type ImageMIMEType = `image/${ImageSubType}`;
export type ApplicationMIMEType = `application/${ApplicationSubType}`;

export type MIMEType = ImageMIMEType | ApplicationMIMEType;

export const donateMethodIds = ["stripe", "crypto", "daf", "stocks"] as const;
export const donateMethodId = v.picklist(donateMethodIds);
export type DonateMethodId = v.InferOutput<typeof donateMethodId>;
