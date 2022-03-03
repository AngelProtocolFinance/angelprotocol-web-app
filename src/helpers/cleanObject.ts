export default function cleanObject<T extends object>(
  obj: T,
  valuesToRemove: T[keyof T][]
) {
  const cleanedObj: Partial<T> = {};
  for (const key in obj) {
    if (!valuesToRemove.includes(obj[key])) {
      cleanedObj[key] = obj[key];
    }
  }
  return cleanedObj as T;
}
