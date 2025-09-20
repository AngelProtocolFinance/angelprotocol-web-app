import { $req } from "@better-giving/schemas";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import type { ImageMIMEType } from "types/lists";
import { notValue, pipe, string } from "valibot";

type Classes = { container?: string; dropzone?: string };

export const errors = {
  invalid_type: "invalid-type",
  exceeds_size: "exceeds-size",
  failure: "failure",
} as const;

type ImgErr = (typeof errors)[keyof typeof errors];

export const img_output = ({ required = false } = {}) =>
  pipe(
    required ? $req : string(),
    notValue(errors.invalid_type, "invalid file type"),
    notValue(errors.exceeds_size, "exceeds file size limit"),
    notValue(errors.failure, "failed to upload")
  );

export type ImgOutput = "loading" | ImgErr | (string & {});

export interface ImgSpec {
  type: ImageMIMEType[];
  aspect: [number, number];
  rounded?: boolean;
  /** in bytes */
  max_size?: number;
}

export type Props<T extends FieldValues, K extends Path<T>> = {
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
  on_change: (value: ImgOutput) => void;
  on_undo: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  classes?: Classes;
  disabled?: boolean;
  error?: string;
}
