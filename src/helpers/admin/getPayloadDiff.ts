export function getPayloadDiff<T extends object>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  // include attr in next different from prev
  for (const key in prev) {
    if (prev[key] !== next[key]) {
      diff[key] = next[key];
    }

    // include attr not in prev but in next
    for (const key in next) {
      if (typeof next[key] === "number") {
        diff[key] = next[key];
        continue;
      }

      if (next[key] && !prev[key]) {
        diff[key] = next[key];
      }
    }
  }

  return diff;
}
