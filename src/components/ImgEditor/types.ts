import type { FieldValues, Path, PathValue } from "react-hook-form";
import type { Bucket, ImageMIMEType } from "types/lists";
import { nonEmpty, notValue, pipe, string } from "valibot";

type Classes = { container?: string; dropzone?: string };

export const errors = {
  invalidType: "invalid-type",
  exceedsSize: "exceeds-size",
  failure: "failure",
} as const;

type ImgErr = (typeof errors)[keyof typeof errors];

const requiredStr = pipe(string(), nonEmpty("required"));

export const imgOutput = ({ required = false } = {}) =>
  pipe(
    required ? requiredStr : string(),
    notValue(errors.invalidType, "invalid type"),
    notValue(errors.exceedsSize, "exceeds limit"),
    notValue(errors.failure, "failed to upload")
  );

export type ImgOutput = "loading" | ImgErr | (string & {});

export interface ImgSpec {
  type: ImageMIMEType[];
  aspect: [number, number];
  rounded?: boolean;
  /** in bytes */
  maxSize?: number;
}

export type Props<T extends FieldValues, K extends Path<T>> = {
  bucket: Bucket;
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: PathValue<T, K> extends ImgOutput ? K : never;
  classes?: Classes;
  spec: ImgSpec;
};

export interface ControlledProps extends Omit<Props<any, any>, "name"> {
  value: ImgOutput;
  /** optional: also run some validation */
  onChange: (value: ImgOutput) => void;
  onUndo: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  classes?: Classes;
  disabled?: boolean;
  error?: string;
}
