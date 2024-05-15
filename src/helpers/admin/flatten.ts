import type { Primitive } from "type-fest";
import { isEmpty } from "../isEmpty";

export type Obj = {
  [index: string]: Primitive | Primitive[] | Obj | Obj[] | (Primitive | Obj)[];
};
type Flat = Record<string, Primitive>;

export function flatten(obj: Obj, curr: Flat = {}, path = ""): Flat {
  const entries = Object.entries(obj);
  if (isEmpty(entries)) return curr;

  return entries.reduce((result, [key, val]) => {
    if (isPrimitive(val)) {
      result[append(key, path)] = val;
      return result;
    }

    if (Array.isArray(val)) {
      if (isEmpty(val)) return result;
      const mapped: Flat[] = val.map<Flat>((v, i) => {
        const k = `${key}.${i}`;
        const p = append(k, path);
        return isPrimitive(v) ? { [p]: v } : flatten(v, result, p);
      });
      return mapped.reduce((acc, curr) => ({ ...acc, ...curr }), result);
    }

    return { ...result, ...flatten(val, result, append(key, path)) };
  }, curr);
}

const append = (key: string, path = "") => (path ? `${path}.${key}` : key);
const isPrimitive = (val: Obj[string]): val is Primitive =>
  typeof val === "string" ||
  typeof val === "number" ||
  typeof val === "boolean" ||
  val == null;
