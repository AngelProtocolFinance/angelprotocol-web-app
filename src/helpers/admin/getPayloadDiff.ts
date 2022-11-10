import deepEqual from "deep-equal";

//NOTE: intended for shallow form objects only atm
export function getPayloadDiff<T extends object>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  // include attr in next different from prev
  for (const key in prev) {
    const n = next[key];
    const p = prev[key];
    if (!deepEqual(p, n, { strict: true })) {
      diff[key] = n;
    }
  }

  // include attr not in prev but in next
  for (const key in next) {
    const n = next[key];
    const p = prev[key];

    if (!p && !isZero(p) && (n || isZero(n))) {
      diff[key] = n;
    }
  }

  return diff;
}

const isZero = (val: any) => val === 0;
