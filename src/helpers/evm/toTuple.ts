import type { Primitive, Tuple, Tupleable } from "types/evm";

const isPrimitive = (val: Tupleable[string]): val is Primitive =>
  typeof val === "number" ||
  typeof val === "string" ||
  typeof val === "boolean";

export function toTuple(val: Tupleable): Tuple {
  return Object.values(val).map((v) => {
    if (isPrimitive(v)) return v;

    if (Array.isArray(v)) {
      return v.map((_v) => (isPrimitive(_v) ? _v : toTuple(_v)));
    }
    return toTuple(v);
  });
}
