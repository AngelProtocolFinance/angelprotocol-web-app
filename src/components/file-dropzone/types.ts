import type { MIMEType } from "types/lists";
export type { MIMEType } from "types/lists";
import { nonEmpty, notValue, pipe, string } from "valibot";
export const errors = {
  invalidType: "invalid-type",
  exceedsSize: "exceeds-size",
  failure: "failure",
} as const;

type FileErr = (typeof errors)[keyof typeof errors];

const requiredStr = pipe(string(), nonEmpty("required"));

export const fileOutput = ({ required = false } = {}) =>
  pipe(
    required ? requiredStr : string(),
    notValue(errors.invalidType, "invalid type"),
    notValue(errors.exceedsSize, "exceeds limit"),
    notValue(errors.failure, "failed to upload")
  );

export type FileOutput = "loading" | FileErr | (string & {});

export interface FileSpec {
  mbLimit: number;
  mimeTypes: MIMEType[];
}
