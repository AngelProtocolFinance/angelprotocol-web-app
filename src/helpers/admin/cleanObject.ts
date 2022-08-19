//NOTE: intended for shallow form objects only atm
export function cleanObject<T extends object>(obj: T) {
  const cleanedObj: Partial<T> = {};
  for (const key in obj) {
    const val = obj[key];
    //include all truthy values and 0
    if (val || isZero(val)) {
      cleanedObj[key] = val;
    }
  }

  return cleanedObj as T;
}

const isZero = (val: any) => val === 0;
