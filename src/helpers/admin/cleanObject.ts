export function cleanObject<T extends object>(obj: T) {
  const cleanedObj: Partial<T> = {};
  for (const key in obj) {
    //include all truthy values
    if (obj[key]) {
      cleanedObj[key] = obj[key];
    }
  }
  return cleanedObj as T;
}
