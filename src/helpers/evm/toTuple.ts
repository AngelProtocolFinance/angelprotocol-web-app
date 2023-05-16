import { Primitives, Tuple, Tupleable } from "types/evm";

export function isTupleable(val: Primitives | Tupleable): val is Tupleable {
  return !(
    typeof val === "number" ||
    typeof val === "string" ||
    typeof val === "boolean"
  );
}

export function toTuple(val: Tupleable): Tuple {
  return Object.values(val).map((v) => {
    if (
      typeof v === "number" ||
      typeof v === "string" ||
      typeof v === "boolean"
    ) {
      return v;
    } else if (Array.isArray(v)) {
      return v.map((_v) => {
        return isTupleable(_v) ? toTuple(_v) : _v;
      });
    } else {
      return toTuple(v);
    }
  });
}
