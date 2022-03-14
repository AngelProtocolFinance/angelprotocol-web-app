import { FieldValues, Path } from "react-hook-form";

export type BaseProps<T extends FieldValues> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: Path<T> & keyof T;
  multiple?: true | boolean;
  className?: string;
  disabled?: boolean;
};
