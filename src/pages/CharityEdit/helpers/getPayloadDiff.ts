export default function getPayloadDiff<T>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  for (const key in prev) {
    if (prev[key] !== next[key]) {
      diff[key] = next[key];
    }
  }
  for (const key in next) {
    if (next[key] && !prev[key]) {
      diff[key] = next[key];
    }
  }

  return diff;
}
