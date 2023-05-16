import { Primitive } from "type-fest";
import { Obj, flatten } from "./flatten";

type Value = string | number | boolean;
type Diff = { [index: string]: [Value, Value] };

//NOTE: intended for shallow form objects only atm
export function getPayloadDiff<T extends object>(prev: T, next: T): Diff {
  const flatPrev = flatten(prev as Obj);
  const flatNext = flatten(next as Obj);

  const diff: Diff = {};
  /** include attr in next different from prev,
   *  given that next is truthy (including 0, and false) */
  for (const key in flatPrev) {
    const n = flatNext[key];
    const p = flatPrev[key];
    if (areDiff(p, n) && some(n, [""])) {
      diff[key] = [some(p) ? p : "not-set", n];
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
    if (none(p) && some(n)) {
      diff[key] = ["not-set", n];
    }
  }

  return diff;
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
const some = (v: Primitive, exempts: Primitive[] = []): v is Value =>
  !!v || isZero(v) || v === false || exempts.includes(v);

// NaN | undefined | null | "" are treated as noValue
const none = (v: Primitive): boolean =>
  v == null || v === "" || Number.isNaN(v);
