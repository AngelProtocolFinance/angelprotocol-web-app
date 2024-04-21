import { FieldValues, Path, PathValue } from "react-hook-form";
import { FileObject } from "types/aws";
import { ImageMIMEType } from "types/lists";

export type ImgLink = FileObject & {
  file?: File;
  preview: string;
};

type Classes = { container?: string; dropzone?: string };

export type Props<T extends FieldValues, K extends Path<T>> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: PathValue<T, K> extends ImgLink ? K : never;
  accept: ImageMIMEType[];
  classes?: Classes;
  aspect: [number, number];
  /**
   * Maximum image size in bytes
   */
  maxSize?: number;
};
