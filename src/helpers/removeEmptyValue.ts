export default function removeEmptyValue(obj: any): Object {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      delete obj[key];
    }
  });
  return obj;
}
