export function cleanObject<T extends object>(obj: T) {
  const cleanedObj: Partial<T> = {};
  for (const key in obj) {
    const val = obj[key];
    //include all truthy values and 0
    if (val != null) {
      cleanedObj[key] = val;
    }
  }

  return cleanedObj as T;
}
