import { FieldValues } from "react-hook-form";

export type Props<T extends FieldValues> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: keyof T & string;
  accept: string[];
  aspectRatioX: number;
  aspectRatioY: number;
};
