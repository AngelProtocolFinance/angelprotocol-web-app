export function cleanObject<T extends Record<string, any>>(obj: T): T {
  const cleanedObject: any = {};

  for (const key in obj) {
    const val = obj[key];
    if (
      obj.hasOwnProperty(key) && //must be first layer prop
      val != null && // must not be null or undefined
      val !== "" && // must not be empty string
      (!Array.isArray(val) || val.length > 0) && // if array, must not be empty
      (typeof val !== "object" || Object.keys(val).length > 0) //if object, must not be empty
    ) {
      cleanedObject[key] = val;
    }
  }

  return cleanedObject as T;
}
