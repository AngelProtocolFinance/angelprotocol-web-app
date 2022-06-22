import { FieldValues, Path } from "react-hook-form";
import { FileObject } from "types/server/aws";

export type BaseProps<T extends FieldValues> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: Path<T> & keyof T;
  multiple?: true | boolean;
  className?: string;
  disabled?: boolean;
};

export type FileWrapper = FileObject & { file: File };
