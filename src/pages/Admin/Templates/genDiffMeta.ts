import { DiffSet } from "pages/Admin/types";

export default function genDiffMeta<T extends object>(
  diffEntries: [keyof T, T[keyof T]][],
  initial: T
) {
  return diffEntries.reduce((result, [key, value]) => {
    result.push([key, initial[key], value]);
    return result;
  }, [] as DiffSet<T>);
}
