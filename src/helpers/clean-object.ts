import { isEmpty } from "./is-empty";

export function cleanObject<T extends Record<string, any>>(obj: T): T {
  const cleanedObject: any = {};

  for (const key in obj) {
    const val = obj[key];
    if (
      obj.hasOwnProperty(key) && //must be first layer prop
      val != null && // must not be null or undefined
      val !== "" && // must not be empty string
      (!Array.isArray(val) || !isEmpty(val)) && // if array, must not be empty
      (typeof val !== "object" || !isEmpty(Object.keys(val))) //if object, must not be empty
    ) {
      cleanedObject[key] = val;
    }
  }

  return cleanedObject as T;
}
