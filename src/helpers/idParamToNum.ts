export function idParamToNum(id?: string | number | null) {
  if (id == null) return 0;

  const numId = Number(id);

  if (Number.isNaN(numId)) return 0;
  return Math.floor(numId);
}
