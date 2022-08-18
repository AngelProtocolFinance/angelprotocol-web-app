export function cleanObject<T extends object>(obj: T) {
  const cleanedObj: Partial<T> = {};
  for (const key in obj) {
    const val = obj[key];

    //include 0
    if (typeof val === "number") {
      cleanedObj[key] = obj[key];
      continue;
    }

    if (obj[key]) {
      cleanedObj[key] = obj[key];
    }

    //include all truthy values
  }

  return cleanedObj as T;
}
