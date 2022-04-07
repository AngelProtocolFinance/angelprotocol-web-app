export default function getPayloadDiff<T>(prev: T, next: T): Partial<T> {
  const diff: any = {};
  // include attr different to prev
  for (const key in prev) {
    console.log({ diff, prev, next });
    if (prev[key] !== next[key]) {
      diff[key] = next[key];
    }
  }

  // include attr not in prev but in next
  for (const key in next) {
    console.log({ diff, prev, next });
    if (next[key] && !prev[key]) {
      diff[key] = next[key];
    }
  }

  return diff;
}
