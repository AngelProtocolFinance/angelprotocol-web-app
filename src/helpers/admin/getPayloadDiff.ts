import type { Primitive } from "type-fest";
import type { Diff, PrimitiveValue } from "types/utils";
import { type Obj, flatten } from "./flatten";

export const NOT_SET = "not-set";

//NOTE: intended for shallow form objects only atm
export function getPayloadDiff<T extends Obj>(prev: T, next: T): Diff[] {
  const flatPrev = flatten(prev);
  const flatNext = flatten(next);

  const diffs: Diff[] = [];
  const keys: { [k: string]: true } = {};
  /** include attr in next different from prev,
   *  given that next is truthy (including 0, and false) */
  for (const key in flatPrev) {
    const n = flatNext[key];
    const p = flatPrev[key];
    if (areDiff(p, n) && some(n, [""])) {
      keys[key] = true;
      diffs.push([key, some(p) ? p : NOT_SET, n]);
    }
  }

  /**
   * if prev is falsy (excluding 0, [] and false),
   * include next value if it's truthy (including 0, [], and false)
   */
  for (const key in flatNext) {
    const n = flatNext[key];
    const p = flatPrev[key];
    //dont consider "" if prev has no value
    if (none(p) && some(n) && !keys[key]) {
      diffs.push([key, NOT_SET, n]);
    }
  }

  return diffs;
}

function areDiff(val1: Primitive, val2: Primitive): boolean {
  if (Number.isNaN(val1) && Number.isNaN(val2)) {
    //two NaNs treated as they are the same
    return /** areDiff? */ false;
  }

  return val1 !== val2;
}

const isZero = (val: any) => val === 0;

//anything truthy, plus 0 and false
const some = (v: Primitive, exempts: Primitive[] = []): v is PrimitiveValue =>
  !!v || isZero(v) || v === false || exempts.includes(v);

// NaN | undefined | null | "" are treated as noValue
const none = (v: Primitive): boolean =>
  v == null || v === "" || Number.isNaN(v);
