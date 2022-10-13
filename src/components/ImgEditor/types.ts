import { FieldValues } from "react-hook-form";

type AssetLink = { name: string; publicUrl: string };
type WithAssetLink<T extends object> = AssetLink & T;
export type ImgLink = WithAssetLink<{ file?: File; preview: string }>;

export type Props<T extends FieldValues, K extends keyof T> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: T[K] extends ImgLink ? K : never;
  accept: string[];
  aspectRatioX: number;
  aspectRatioY: number;
  className?: string;
};
