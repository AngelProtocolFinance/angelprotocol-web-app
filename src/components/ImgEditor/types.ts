import type { FieldValues, Path, PathValue } from "react-hook-form";
import type { Bucket, ImageMIMEType } from "types/lists";
import {
  type InferOutput,
  boolean,
  never,
  nonEmpty,
  object,
  optional,
  pipe,
  string,
} from "valibot";

type Classes = { container?: string; dropzone?: string };

export const imgOutput = ({ required = false }) =>
  object({
    url: required ? pipe(string("required"), nonEmpty("required")) : string(),
    uploading: optional(boolean()),
    invalidType: optional(never("invalid type")),
    exceedsSize: optional(never("exceeds limit")),
    error: optional(never("failed to upload")),
  });

export interface ImgOutput extends InferOutput<ReturnType<typeof imgOutput>> {}

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
