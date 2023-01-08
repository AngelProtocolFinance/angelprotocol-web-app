//NOTE: intended for shallow form objects only atm
export function getPayloadDiff<T extends object>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  /** include attr in next different from prev,
   *  given that next is truthy (including 0, and false) */
  for (const key in prev) {
    const n = next[key];
    const p = prev[key];
    if (p !== n && hasValue(n, [""])) {
      diff[key] = n;
    }
  }

  /**
   * if prev is falsy (excluding 0 and false),
   * include next value if it's truthy (including 0, and false)
   */
  for (const key in next) {
    const n = next[key];
    const p = prev[key];
    //dont consider "" if prev has no value
    if (hasNoValue(p) && hasValue(n)) {
      diff[key] = n;
    }
  }

  return diff;
}

const isZero = (val: any) => val === 0;

//anything truthy, plus 0 and false
function hasValue(val: any, exempts: any[] = []): boolean {
  return !!val || isZero(val) || val === false || exempts.includes(val);
}

// undefined | null || "" are treated as noValue
function hasNoValue(val: any): boolean {
  return val == null || val === "";
}
