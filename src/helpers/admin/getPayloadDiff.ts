//NOTE: intended for shallow form objects only atm
export function getPayloadDiff<T extends object>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  /** include attr in next different from prev,
   *  given that next is truthy (including 0, and false) */
  for (const key in prev) {
    const n = next[key];
    const p = prev[key];
    if (p !== n && hasValue(n)) {
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

    if (isEmpty(p) && hasValue(n)) {
      diff[key] = n;
    }
  }

  return diff;
}

const isZero = (val: any) => val === 0;

// anything truthy including 0 && false
function hasValue(val: any): boolean {
  return val || isZero(val) || val === false;
}

//undefined | null | "" is considered empty
function isEmpty(val: any): boolean {
  return val == null || val === "";
}
