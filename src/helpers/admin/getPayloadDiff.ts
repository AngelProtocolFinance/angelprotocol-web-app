//NOTE: intended for shallow form objects only atm
export function getPayloadDiff<T extends object>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  /** include attr in next different from prev,
   *  given that next is truthy (including 0) */
  for (const key in prev) {
    const n = next[key];
    const p = prev[key];
    if (p !== n && (n || isZero(n))) {
      diff[key] = n;
    }
  }

  /**
   * if prev is falsy (excluding 0 and false),
   * include next value if it's truthy (including 0)
   */
  for (const key in next) {
    const n = next[key];
    const p = prev[key];

    /**
     * !p             -> null | undefined | "" | 0 | false
     * && !isZero(p)  -> null | undefined | "" | false
     * && p !== false -> null | undefined | ""
     */

    if (!p && !isZero(p) && p !== false && (n || isZero(n))) {
      diff[key] = n;
    }
  }

  return diff;
}

const isZero = (val: any) => val === 0;
