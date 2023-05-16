import { Tupleable } from "types/evm";
import { isPrimitive } from "helpers/evm";
import { isEmpty } from "helpers/isEmpty";

type Flat = Record<string, string | number | boolean>;
const append = (key: string, path = "") => (path ? `${path}.${key}` : key);

export function flatten(obj: Tupleable, curr: Flat = {}, path = ""): Flat {
  const entries = Object.entries(obj);
  if (entries.length === 0) return curr;

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
