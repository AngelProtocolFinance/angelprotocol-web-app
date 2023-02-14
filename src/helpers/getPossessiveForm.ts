export function getPossessiveForm(name: string) {
  let result = `${name}'`;
  if (!name.endsWith("s")) {
    result += "s";
  }
  return result;
}
