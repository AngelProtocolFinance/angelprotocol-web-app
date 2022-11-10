import deepEqual from "deep-equal";

export function getPayloadDiff<T extends object>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  // include attr in next different from prev
  for (const key in prev) {
    const p = prev[key];
    const n = next[key];

    if (!deepEqual(p, n, { strict: true })) {
      diff[key] = n;
    }
  }

  // include attr not in prev but in next
  for (const key in next) {
    const p = prev[key];
    const n = next[key];

    if (p == null && n != null) {
      diff[key] = n;
    }
  }

  return diff;
}
